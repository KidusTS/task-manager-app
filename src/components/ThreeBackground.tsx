import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";
    mountRef.current.appendChild(renderer.domElement);

    // Create star particles
    const stars: THREE.Mesh[] = [];
    const starCount = 500;

    // Small star particles
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 0.07 + 0.02;
      const geometry = new THREE.SphereGeometry(size, 4, 4);

      const material = new THREE.MeshBasicMaterial({
        color: theme === "dark" ? 0xffffff : 0x87ceeb,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.4,
      });

      const star = new THREE.Mesh(geometry, material);

      star.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );

      star.userData = {
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      };

      scene.add(star);
      stars.push(star);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate stars (twinkling)
      stars.forEach((star) => {
        const material = star.material as THREE.MeshBasicMaterial;
        material.opacity =
          0.3 +
          Math.sin(
            time * star.userData.twinkleSpeed + star.userData.twinkleOffset
          ) *
            0.4;
      });

      // Rotate camera slightly for dynamic effect
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      stars.forEach((star) => {
        star.geometry.dispose();
        (star.material as THREE.Material).dispose();
      });
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none "
      style={{ zIndex: 1 }}
    />
  );
}
