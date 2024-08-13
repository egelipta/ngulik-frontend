import { DrawerForm, PageContainer, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { dataRackServerApiV1RackServerRackServerDataRackServerGet } from '@/services/pjvms/rackServer';

export default memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
    const [drawerVisit, setDrawerVisit] = useState(false);
    const [selectedRack, setSelectedRack] = useState<any>(null); // State untuk menyimpan rack server yang dipilih

    const mapGroup = useRef<Map<THREE.Group, any>>(new Map());
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());

    const getData = async () => {
        try {
            const result = await dataRackServerApiV1RackServerRackServerDataRackServerGet();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#eee');

        // Camera setup
        const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 50000);
        camera.position.set(0, 2000, 15000);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // OrbitControls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // =============================================
        // Rack Server
        const createWall = (width: number, height: number, depth: number, x: number, y: number, z: number) => {
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshBasicMaterial({
                color: '#000',
                opacity: 0.2,
                transparent: true,
                side: THREE.DoubleSide
            });

            const wall = new THREE.Mesh(geometry, material);
            wall.position.set(x, y, z);
            return wall;
        };

        const createGroups: THREE.Group[] = [];

        const gap = 50;
        data.forEach((d) => {
            const group = new THREE.Group();
            const left = createWall(gap, d.height, d.depth, -d.width / 2 + gap / 2, 0 - gap / 2, 0);
            const right = createWall(gap, d.height, d.depth, d.width / 2 - gap / 2, 0 - gap / 2, 0);
            const top = createWall(d.width, gap, d.depth, 0, d.height / 2 - 2 * (gap / 2), 0);
            const bottom = createWall(d.width, gap, d.depth, 0, -d.height / 2, 0);

            group.add(left);
            group.add(right);
            group.add(top);
            group.add(bottom);

            group.position.set(d.x, -1780 + d.height / 2, d.z);
            scene.add(group);
            createGroups.push(group);

            mapGroup.current.set(group, d);
        });
        // =============================================

        // Grid Helper setup
        const helper = new GridHelper(15000, 100);
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        helper.position.set(0, -1800, 0);
        scene.add(helper);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (container) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };

        // Create a ResizeObserver to handle size changes
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        // Click Rack Server
        const onMouseClick = (event: MouseEvent) => {
            if (!container) return;

            const rect = renderer.domElement.getBoundingClientRect();
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
            mouse.current.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            mouse.current.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

            // Update the raycaster with the new mouse position
            raycaster.current.setFromCamera(mouse.current, camera);

            // Calculate objects intersecting the ray
            const intersects = raycaster.current.intersectObjects(createGroups, true);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                const parentGroup = intersectedObject.parent as THREE.Group;
                const dataRacks = mapGroup.current.get(parentGroup);
                if (dataRacks) {
                    setSelectedRack(dataRacks); // Simpan rack server yang dipilih
                    setDrawerVisit(true);
                    console.log('CLICKED: ', dataRacks.name);
                }
            }
        };
        container.addEventListener('click', onMouseClick);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            if (container) {
                container.removeChild(renderer.domElement);
                container.removeEventListener('click', onMouseClick);
            }
        };
    }, [data]);

    return (
        <PageContainer>
            <div ref={containerRef} style={{ width: '100%', height: '70vh' }} />

            <DrawerForm
                key={selectedRack?.id}
                onOpenChange={setDrawerVisit}
                title="Detail Rack Server"
                open={drawerVisit}
                width={500}
                request={async () => {
                    return selectedRack;
                }}
            >
                <ProFormText
                    name="name"
                    label="Nama"
                    width="lg"
                    placeholder="Nama..."
                    readonly
                />
                <ProForm.Group>
                    <ProFormText
                        width={'xs'}
                        name="width"
                        readonly
                    />
                    <ProFormText
                        width={'xs'}
                        name="height"
                        readonly
                    />
                    <ProFormText
                        width={'xs'}
                        name="depth"
                        readonly
                    />
                </ProForm.Group>
            </DrawerForm>
        </PageContainer>
    );
});
