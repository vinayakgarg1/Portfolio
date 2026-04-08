"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 2.5
const MOUSE_INFLUENCE_RADIUS = 3

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mousePosition = useRef(new THREE.Vector3(0, 0, 0))
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        scale: 0.03 + Math.random() * 0.04,
      })
    }
    return temp
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return

    // Update mouse position in 3D space
    const x = (state.pointer.x * viewport.width) / 2
    const y = (state.pointer.y * viewport.height) / 2
    mousePosition.current.set(x, y, 0)

    let lineIndex = 0

    // Update particles
    particles.forEach((particle, i) => {
      // Slow rotation movement
      particle.position.add(particle.velocity)

      // Boundary wrapping
      if (particle.position.x > 6) particle.position.x = -6
      if (particle.position.x < -6) particle.position.x = 6
      if (particle.position.y > 4) particle.position.y = -4
      if (particle.position.y < -4) particle.position.y = 4
      if (particle.position.z > 3) particle.position.z = -3
      if (particle.position.z < -3) particle.position.z = 3

      // Mouse interaction - particles gently move away from cursor
      const distToMouse = particle.position.distanceTo(mousePosition.current)
      if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
        const repelForce = new THREE.Vector3()
          .subVectors(particle.position, mousePosition.current)
          .normalize()
          .multiplyScalar(0.02 * (1 - distToMouse / MOUSE_INFLUENCE_RADIUS))
        particle.position.add(repelForce)
      }

      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    // Draw connections between nearby particles (including mouse proximity)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position)
        
        // Check if either particle is near mouse for enhanced connections
        const particle1NearMouse = particles[i].position.distanceTo(mousePosition.current) < MOUSE_INFLUENCE_RADIUS
        const particle2NearMouse = particles[j].position.distanceTo(mousePosition.current) < MOUSE_INFLUENCE_RADIUS
        const enhancedConnection = particle1NearMouse || particle2NearMouse
        
        const maxDist = enhancedConnection ? CONNECTION_DISTANCE * 1.3 : CONNECTION_DISTANCE

        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist
          const baseColor = enhancedConnection ? 0.6 : 0.3

          linePositions[lineIndex * 6] = particles[i].position.x
          linePositions[lineIndex * 6 + 1] = particles[i].position.y
          linePositions[lineIndex * 6 + 2] = particles[i].position.z
          linePositions[lineIndex * 6 + 3] = particles[j].position.x
          linePositions[lineIndex * 6 + 4] = particles[j].position.y
          linePositions[lineIndex * 6 + 5] = particles[j].position.z

          // Green-tinted lines matching the primary color
          const greenIntensity = enhancedConnection ? 0.85 : 0.55
          lineColors[lineIndex * 6] = 0.13 * alpha * baseColor
          lineColors[lineIndex * 6 + 1] = greenIntensity * alpha * baseColor
          lineColors[lineIndex * 6 + 2] = 0.35 * alpha * baseColor
          lineColors[lineIndex * 6 + 3] = 0.13 * alpha * baseColor
          lineColors[lineIndex * 6 + 4] = greenIntensity * alpha * baseColor
          lineColors[lineIndex * 6 + 5] = 0.35 * alpha * baseColor

          lineIndex++
        }
      }
    }

    // Clear remaining line positions
    for (let i = lineIndex; i < PARTICLE_COUNT * PARTICLE_COUNT; i++) {
      linePositions[i * 6] = 0
      linePositions[i * 6 + 1] = 0
      linePositions[i * 6 + 2] = 0
      linePositions[i * 6 + 3] = 0
      linePositions[i * 6 + 4] = 0
      linePositions[i * 6 + 5] = 0
    }

    const lineGeometry = linesRef.current.geometry as THREE.BufferGeometry
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))
    lineGeometry.attributes.position.needsUpdate = true
    lineGeometry.attributes.color.needsUpdate = true
  })

  return (
    <group rotation={[0, 0, 0.1]}>
      {/* Particle instances */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT * PARTICLE_COUNT * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} />
      </lineSegments>
    </group>
  )
}

export function ParticleNetwork() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  )
}
