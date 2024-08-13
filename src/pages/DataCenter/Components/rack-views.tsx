import { PageContainer, ProCard } from '@ant-design/pro-components';
import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { dataRackServerApiV1RackServerRackServerDataRackServerGet } from '@/services/pjvms/rackServer';

export default memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
    const rackGroupDataMap = useRef<Map<THREE.Group, any>>(new Map());

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

        const gridY = -1800;
        const gap = 20;

        // Create text texture
        const createTextTexture = (text: string) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                throw new Error('Failed to get canvas context');
            }
            const fontSize = 300;
            canvas.width = 512;
            canvas.height = 256;
            context.font = `${fontSize}px Arial`;
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        // ========================================================
        const dataPosisiRack = [
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '6', kaliJarak: 1 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '7', kaliJarak: 3 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '8', kaliJarak: 5 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '9', kaliJarak: 7 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '10', kaliJarak: 9 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '5', kaliJarak: -1 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '4', kaliJarak: -3 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '3', kaliJarak: -5 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '2', kaliJarak: -7 },
            { width: 600, depth: 1200, posX: 700, posZ: 0, label: '1', kaliJarak: -9 }
        ];

        dataPosisiRack.forEach(dpr => {
            const geometry = new THREE.PlaneGeometry(dpr.width, dpr.depth);
            const material = new THREE.MeshBasicMaterial({ color: '#ddd', side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotation.x = -Math.PI / 2;
            plane.position.set(dpr.posX * dpr.kaliJarak, gridY, dpr.posZ);
            // plane.material.visible = true;
            scene.add(plane);

            // Add label
            const textTexture = createTextTexture(`${dpr.label}`);
            const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(dpr.posX * dpr.kaliJarak, gridY + 50, dpr.posZ); // Adjust y-position for better visibility
            sprite.scale.set(200, 100, 1); // Adjust scale as needed
            // sprite.material.visible = true;
            scene.add(sprite);

            data.forEach(rg => {
                if (rg.x === dpr.posX * dpr.kaliJarak) {
                    plane.material.visible = false;
                    sprite.material.visible = false;
                }
            });
        });


        // ============================================RACK SERVER=============================================
        // Function to create walls
        const createWall = (width: number, height: number, depth: number, x: number, y: number, z: number) => {
            const geometryRack = new THREE.BoxGeometry(width, height, depth);
            const materialRack = new THREE.MeshBasicMaterial({
                color: '#000', transparent: true, opacity: 0.3, side: THREE.DoubleSide,
                depthTest: true, wireframe: false
            });
            const dinding = new THREE.Mesh(geometryRack, materialRack);
            dinding.position.set(x, y, z);
            return dinding;
        };

        // Create rack groups
        const rackGroups: THREE.Group[] = [];

        data.forEach(rg => {
            const rackGroup = new THREE.Group();

            const sisiKiri = createWall(gap, rg.height, rg.depth, -rg.width / 2 + (gap / 2), 0 - (gap / 2), 0);
            const sisiKanan = createWall(gap, rg.height, rg.depth, rg.width / 2 - (gap / 2), 0 - (gap / 2), 0);
            const sisiAtas = createWall(rg.width, gap, rg.depth, 0, rg.height / 2 - (2 * (gap / 2)), 0);
            const sisBawah = createWall(rg.width, gap, rg.depth, 0, -rg.height / 2, 0);

            rackGroup.add(sisiKiri);
            rackGroup.add(sisiKanan);
            rackGroup.add(sisiAtas);
            rackGroup.add(sisBawah);

            rackGroup.position.set(rg.x, gridY + rg.height / 2, rg.z);
            scene.add(rackGroup);
            rackGroups.push(rackGroup);

            // Map the rackGroup to its data
            rackGroupDataMap.current.set(rackGroup, rg);
        });
        // ============================================RACK SERVER=============================================

        // ============================================DEVICE=============================================
        const dataDevice = [
            {
                id: 1,
                name: 'Device 1',
                image: '/device.png',
                posx: -700,
                posy: -190,
                posz: 300,
                width: 600,
                height: 45 * 2,
                depth: 600
            }
        ]

        const textureLoader = new THREE.TextureLoader();
        dataDevice.forEach((conf) => {
            const texture = textureLoader.load(conf.image);
            const geometry = new THREE.BoxGeometry(conf.width, conf.height, conf.depth);
            const material = new THREE.MeshBasicMaterial({ color: '#5c5b5b' });
            const device = new THREE.MeshBasicMaterial({ map: texture })

            const materials = [
                material, // kanan
                material, // kiri
                material, // atas
                material, // bawah
                device, // depan
                material, // belakang
            ]


            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(conf.posx, conf.posy, conf.posz);

            // Membuat edge geometry dan outline material
            const edge = new THREE.EdgesGeometry(geometry);
            const outline = new THREE.LineBasicMaterial({
                color: 0x000,
                linewidth: 1,
            });

            const outlineRack = new THREE.LineSegments(edge, outline);
            cube.add(outlineRack);
            scene.add(cube);
        })
        // ============================================DEVICE=============================================

        // Grid Helper setup
        const helper = new GridHelper(15000, 100);
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        helper.position.set(0, gridY, 0);
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

        // Cleanup
        return () => {
            resizeObserver.disconnect();
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
