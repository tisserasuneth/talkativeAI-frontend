import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const WebGLAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let stage, mesh;

        let mousePosition = new THREE.Vector2(0, 0);

        const calculateScaleFactor = () => {
            const width = window.innerWidth;
            if (width > 1500) return 5.0;
            return 4.0;
        };

        class Stage {
            constructor(canvas) {
                this.renderParam = {
                    clearColor: 0xffffff,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };

                this.cameraParam = {
                    near: 0,
                    far: -1,
                };

                this.scene = null;
                this.camera = null;
                this.renderer = null;

                this.canvas = canvas;
            }

            init() {
                this._setScene();
                this._setRenderer();
                this._setCamera();
            }

            _setScene() {
                this.scene = new THREE.Scene();
            }

            _setRenderer() {
                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.canvas,
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
                this.renderer.setSize(this.renderParam.width, this.renderParam.height);
            }

            _setCamera() {
                const aspect = window.innerWidth / window.innerHeight;
                const viewSize = 1;

                this.camera = new THREE.OrthographicCamera(
                    -aspect * viewSize,
                    aspect * viewSize,
                    viewSize,
                    -viewSize,
                    this.cameraParam.near,
                    this.cameraParam.far
                );

                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.camera.updateProjectionMatrix();
            }

            onResize() {
                this.renderParam.width = window.innerWidth;
                this.renderParam.height = window.innerHeight;

                this.renderer.setSize(this.renderParam.width, this.renderParam.height);
                this._setCamera();
            }

            render() {
                this.renderer.render(this.scene, this.camera);
            }
        }

        class Mesh {
            constructor(stage) {
                this.uniforms = {
                    resolution: {
                        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
                    },
                    time: { value: 0.0 },
                    mouse: { value: mousePosition },
                    xScale: { value: 1.0 },
                    yScale: { value: 0.3 },
                    distortion: { value: 0.05 },
                    scaleFactor: { value: calculateScaleFactor() },
                };

                this.stage = stage;
                this.mesh = null;
            }

            init() {
                this._setMesh();
            }

            _setMesh() {
                const position = [
                    -1.0, -1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, 1.0, 0.0,
                ];

                const positions = new THREE.BufferAttribute(new Float32Array(position), 3);

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute("position", positions);

                const material = new THREE.RawShaderMaterial({
                    vertexShader: `
            attribute vec3 position;
            void main() {
              gl_Position = vec4(position, 1.0);
            }
          `,
                    fragmentShader: `
            precision highp float;
            uniform vec2 resolution;
            uniform float time;
            uniform vec2 mouse;
            uniform float xScale;
            uniform float yScale;
            uniform float distortion;
            uniform float scaleFactor;

            void main() {
              vec2 p = (gl_FragCoord.xy * scaleFactor - resolution) / min(resolution.x, resolution.y);
              float d = length(p) * distortion;

              // Adjust waves based on mouse proximity
              vec2 mouseDist = p - mouse;
              float influence = pow(1.0 - length(mouseDist) * 0.3, 5.0);
              influence = max(influence, 0.0);

              float rx = p.x * (1.0 + d + influence * 5.0);
              float gx = p.x;
              float bx = p.x * (1.0 - d - influence);

              float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
              float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
              float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

              gl_FragColor = vec4(r, g, b, 1.0);
            }
          `,
                    uniforms: this.uniforms,
                    side: THREE.DoubleSide,
                });

                this.mesh = new THREE.Mesh(geometry, material);
                this.stage.scene.add(this.mesh);
            }

            render() {
                this.uniforms.time.value += 0.01;
                this.uniforms.mouse.value = mousePosition;
                this.uniforms.scaleFactor.value = calculateScaleFactor();
            }
        }

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.render();
            stage.render();
        };

        const handleMouseMove = (event) => {
            mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleResize = () => {
            stage.onResize();
        };

        const canvas = canvasRef.current;
        stage = new Stage(canvas);
        stage.init();

        mesh = new Mesh(stage);
        mesh.init();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            stage.renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default WebGLAnimation;
