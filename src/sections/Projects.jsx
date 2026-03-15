import { useState, useRef, useEffect } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState(null);

  // Timeline logic
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [timelineRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      onMouseMove={handleMouseMove}
      id="work"
      className="relative c-space section-spacing"
      ref={containerRef}
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      {/* Timeline + Projects wrapper */}
      <div ref={timelineRef} className="relative">
        {/* Timeline track (background line) */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Animated purple fill */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>

        {/* Project items with timeline nodes */}
        {myProjects.map((project, index) => (
          <div key={project.id} className="relative pl-10 md:pl-12">
            {/* Timeline node (circle) */}
            <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] top-12 bg-midnight z-40">
              <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
            </div>
            <Project {...project} setPreview={setPreview} />
          </div>
        ))}
      </div>

      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;