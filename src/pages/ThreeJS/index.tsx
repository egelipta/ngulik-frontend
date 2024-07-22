import { PageContainer } from '@ant-design/pro-components';
import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { dataRackServerApiV1RackServerRackServerDataRackServerGet } from '@/services/pjvms/rackServer'
import { Tooltip } from 'antd';

export default memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const rackGroupDataMap = useRef<Map<THREE.Group, any>>(new Map());
    const hoveredObject = useRef<THREE.Group | null>(null); // Track the currently hovered object

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
        const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 1, 50000);
        camera.position.set(0, 2000, 13000);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // OrbitControls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Function to create walls
        const createWall = (width: number, height: number, depth: number, x: number, y: number, z: number) => {
            const geometryRack = new THREE.BoxGeometry(width, height, depth);
            const materialRack = new THREE.MeshBasicMaterial({
                color: '#000', transparent: true, opacity: 0.3, side: THREE.DoubleSide,
                depthTest: false, wireframe: false
            });
            const dinding = new THREE.Mesh(geometryRack, materialRack);
            dinding.position.set(x, y, z);
            return dinding;
        };

        // Create rack groups
        const rackGroups: THREE.Group[] = [];

        data.forEach(r => {
            const rackGroup = new THREE.Group();
            rackGroup.name = r.id; // Set the ID here

            const sisiKiri = createWall(30, r.height, r.depth, -r.width / 2 + 15, 0 - 15, 0);
            const sisiKanan = createWall(30, r.height, r.depth, r.width / 2 - 15, 0 - 15, 0);
            const sisiAtas = createWall(r.width, 30, r.depth, 0, r.height / 2 - (2 * 15), 0);
            const sisBawah = createWall(r.width, 30, r.depth, 0, -r.height / 2, 0);
            // const sisiBelakang = createWall(r.width, r.height, 30, 0, 0, -r.depth / 2);

            rackGroup.add(sisiKiri);
            rackGroup.add(sisiKanan);
            rackGroup.add(sisiAtas);
            rackGroup.add(sisBawah);
            // rackGroup.add(sisiBelakang);

            rackGroup.position.set(r.x, r.y, r.z);
            scene.add(rackGroup);
            rackGroups.push(rackGroup);

            // Map the rackGroup to its data
            rackGroupDataMap.current.set(rackGroup, r);
        });

        // Grid Helper setup
        const helper = new GridHelper(8500, 100);
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        helper.position.set(0, -960, 0);
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

        // Mouse move event handler
        const onMouseMove = (event: MouseEvent) => {
            if (!container) return;

            const rect = renderer.domElement.getBoundingClientRect();
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
            mouse.current.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            mouse.current.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

            // Update the raycaster with the new mouse position
            raycaster.current.setFromCamera(mouse.current, camera);

            // Calculate objects intersecting the ray
            const intersects = raycaster.current.intersectObjects(rackGroups, true);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                const parentGroup = intersectedObject.parent as THREE.Group;

                // Reset the color of the previously hovered object
                if (hoveredObject.current && hoveredObject.current !== parentGroup) {
                    hoveredObject.current.children.forEach(child => {
                        if (child instanceof THREE.Mesh) {
                            (child.material as THREE.MeshBasicMaterial).color.set('#000');
                        }
                    });
                }

                // Set color of the currently hovered object
                parentGroup.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        (child.material as THREE.MeshBasicMaterial).color.set('#2241a8');
                    }
                });

                hoveredObject.current = parentGroup; // Update the hovered object reference
            } else if (hoveredObject.current) {
                // Reset color if no object is hovered
                hoveredObject.current.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        (child.material as THREE.MeshBasicMaterial).color.set('#000');
                    }
                });
                hoveredObject.current = null; // Clear the hovered object reference
            }
        };

        // Mouse click event handler
        const onMouseClick = (event: MouseEvent) => {
            if (!container) return;

            const rect = renderer.domElement.getBoundingClientRect();
            // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
            mouse.current.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
            mouse.current.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

            // Update the raycaster with the new mouse position
            raycaster.current.setFromCamera(mouse.current, camera);

            // Calculate objects intersecting the ray
            const intersects = raycaster.current.intersectObjects(rackGroups, true);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                const parentGroup = intersectedObject.parent as THREE.Group;
                const rackData = rackGroupDataMap.current.get(parentGroup);
                if (rackData) {
                    console.log(`Clicked: ${rackData.name}`);
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onMouseClick);
            if (container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [data]);

    return (
        <PageContainer>
            <div ref={containerRef} style={{ width: '100%', height: '70vh' }} />
        </PageContainer>
    );
});