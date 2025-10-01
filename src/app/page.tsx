"use client";

import { useState, useEffect, JSX } from "react";
import { ArrowUp, Moon, Sun, Circle} from "lucide-react";
import { motion} from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaGoogle,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiJavascript,
  SiFirebase,
  SiPython,
} from "react-icons/si";

// Definição de tipos para projeto
interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  tools: string[];
  source: string;
  status: "Development" | "Live" | "Beta";
}
// Definição de tipos para experiência
interface Experience {
    year: string;
    title: string;
    description: string;
    icon: JSX.Element;
}
// Mapeamento para ícones
const skillIcons: { [key: string]: JSX.Element } = {
  JavaScript: <SiJavascript size={24} className="text-yellow-400" />,
  TypeScript: <SiTypescript size={24} className="text-blue-500" />,
  Python: <SiPython size={24} className="text-yellow-400" />,
  React: <FaReact size={24} className="text-cyan-400" />,
  "Next.js": <SiNextdotjs size={24} className="text-gray-400" />,
  "Node.js": <FaNodeJs size={24} className="text-green-600" />,
  TailwindCSS: <SiTailwindcss size={24} className="text-cyan-500" />,
  HTML: <FaHtml5 size={24} className="text-orange-500" />,
  CSS: <FaCss3Alt size={24} className="text-blue-500" />,
  PostgreSQL: <SiPostgresql size={24} className="text-blue-600" />,
  Firebase: <SiFirebase size={24} className="text-orange-600" />,
  Git: <FaGitAlt size={24} className="text-orange-600" />,
  Docker: <FaDocker size={24} className="text-blue-400" />,
};
// Componente principal
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Dados dos projetos
  const projects: Project[] = [
    {
      id: 1,
      title: "To-Do App",
      type: "FULLSTACK",
      description:
        "Aplicativo de lista de tarefas com CRUD e autenticação básica.",
      tools: ["React", "Node.js", "Express", "MongoDB"],
      source: "https://github.com/seuusuario/todo-app",
      status: "Development",
    },
    {
      id: 2,
      title: "Blog com Autenticação",
      type: "FULLSTACK",
      description: "Blog simples com registro, login e CRUD de posts.",
      tools: ["Next.js", "Express", "PostgreSQL"],
      source: "https://github.com/seuusuario/blog-app",
      status: "Live",
    },
    {
      id: 3,
      title: "Dashboard de Dados",
      type: "WEB",
      description: "Dashboard responsivo com gráficos dinâmicos.",
      tools: ["React", "TailwindCSS", "Chart.js"],
      source: "https://github.com/seuusuario/dashboard",
      status: "Beta",
    },
  ];
  // Dados das experiências
  const experiences: Experience[] = [
    { year: "2025", title: "Desenvolvedor Full Stack", 
      description: "Atuação em projetos de alto impacto utilizando React, Next.js, Node e TailwindCSS.", 
      icon: <Circle className="w-6 h-6 text-orange-500" /> },
    { year: "2023", 
      title: "Graduação em Ciência da Computação", 
      description: "Conclusão do curso com foco em desenvolvimento web, banco de dados e algoritmos.", 
      icon: <Circle className="w-6 h-6 text-orange-500" /> },
    { 
      year: "2022", 
      title: "Certificação em React Avançado", 
      description: "Formação completa em React e Next.js com integração de APIs e otimização de performance.", 
      icon: <Circle className="w-6 h-6 text-orange-500" /> },
  ];
  // Lista de skills
  const skills: string[] = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "TailwindCSS",
    "Python",
    "HTML",
    "CSS",
    "PostgreSQL",
    "Firebase",
    "Git",
    "Docker",
  ];
  // Efeito para aplicar tema dark/light
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Efeito para alternar tema
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Função para rolar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Função para renderizar ícone de status
  const renderStatusIcon = (status: Project["status"]) => {
    const base = "w-3 h-3 rounded-full";
    switch (status) {
      case "Development": return <span className={`${base} bg-yellow-400`} />;
      case "Live": return <span className={`${base} bg-green-400`} />;
      case "Beta": return <span className={`${base} bg-purple-400`} />;
      }
    };

  // Efeito para detectar se está no topo da página
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efeito para detectar seção ativa
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // JSX retornado
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } min-h-screen transition-colors duration-300 ease-in-out font-mono`}>
      
      {/* Header */}
      <header
        className={`${isTop
        ? "w-full top-0 mx-auto items-center flex p-1"
        : "left-1/2 -translate-x-1/2 border border-gray-500 top-5 shadow-md"
        } ${darkMode ? "bg-gray-800" : "bg-gray-100"}
         fixed z-40 transition-all duration-300 ease-in-out`} >

        <nav className="max-w-6xl mx-auto flex pt-4 pb-3 px-8">

          {/* Menu Mobile */}
          <div className="flex justify-between gap-5 w-full md:w-auto items-center">
            <button
              className="md:hidden text-orange-500 text-2xl hover:text-orange-600 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? "bg-gray-600 hover:bg-orange-600" : "bg-gray-300 hover:bg-orange-300"
                } md:hidden rounded-md flex items-center pl-1.5 h-6 w-8 transition `}>
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-100" />
              ) : (
                <Moon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          {/* Menu Desktop */}
          <ul className="hidden md:flex gap-10 font-medium text-sm justify-between items-center">
            <li>
              <a
                href="#home"
                className={`${activeSection === "home" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`${activeSection === "about" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`${activeSection === "skills" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Competências
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`${activeSection === "projects" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Projetos
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className={`${activeSection === "experience" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Experiência
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`${activeSection === "contact" ? "text-orange-500" : ""} hover:text-orange-500`}>
                Contato
              </a>
            </li>
            <div className="block w-px h-8 bg-gray-300 dark:bg-gray-600 mx-3"/>
            <li className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${
                  darkMode ? "bg-gray-600 hover:bg-orange-600" : "bg-gray-300 hover:bg-orange-300"
                } rounded-md flex items-center pl-1.5 h-6 w-8 transition `}> 
                {darkMode ? (
                <Sun className="w-5 h-5 text-gray-100"/>
                ) : (
                <Moon className="w-5 h-5 text-gray-500"/>
                )}
                </button>
            </li>
          </ul>
        </nav>
        {/* Menu Mobile Expandido */}
        {menuOpen && (
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"} md:hidden absolute top-16 left-0 w-full shadow-lg`}>
            <ul className="flex flex-col gap-4 p-4 font-medium text-sm">
              <li>
                <a href="#home" onClick={() => setMenuOpen(false)} className={`${activeSection === "home" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setMenuOpen(false)} className={`${activeSection === "about" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Sobre
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => setMenuOpen(false)} className={`${activeSection === "skills" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Competências
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => setMenuOpen(false)} className={`${activeSection === "projects" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Projetos
                </a>
              </li>
              <li>
                <a href="#experience" onClick={() => setMenuOpen(false)} className={`${activeSection === "experience" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Experiência
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setMenuOpen(false)} className={`${activeSection === "contact" ? "text-orange-500" : ""} hover:text-orange-500`}>
                  Contato
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>


      {/* Home */}
      <section id="home" className="h-screen flex max-w-screen items-center justify-center px-6 pt-15 pb-20 overflow-hidden"
        style={{
          background: darkMode
            ? "linear-gradient(to right, #1E2939 50%, #FF6900 50%) "
            : "linear-gradient(to right, #F8F8F8 50%, #FF6900 50%)",
        }}>
        <div className="grid grid-cols-2 mr-5 items-center">
          <div className=" mt-5 mx-auto ">
            <h3 className="text-4xl md:text-5xl font-extrabold mr-5 z-10">
              Henrique Araújo Miranda
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600 "
              } text-lg md:text-3xl max-w-2xl mt-4 relative z-10`}>
              Full Stack Developer
            </p>
            <div className="flex mb-6">
              <dl className={`${darkMode ? "text-white" : "text-gray-900 "
            } grid grid-cols-2 mt-6`}>
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">0{projects.length}</dt>
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{new Date().getFullYear() - 2017} anos</dt>
                <dd className={`${darkMode ? "text-gray-400" : "text-gray-500"
                  } font-light`}>Projetos</dd>
                <dd className={`${darkMode ? "text-gray-400" : "text-gray-500"
                    } font-light`}>Experiência</dd>
              </dl>
            </div>
            
            <div className="flex gap-4 ">
              <button className="mt-3 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                  LinkedIn
              </button>
              <button className="mt-3 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition" >
                Github
              </button>
            </div>
          </div>

          <div className="flex justify-end-safe items-center md:justify-center hover:scale-105 transition-transform">
            <img src="https://avatars.githubusercontent.com/u/1?v=4" className="md:w-80 md:h-80 w-60 h-60 shadow-2xl z-10" />
          </div>   

        </div>
      </section>
      

       {/* About */}
       <section id="about" className=" items-center justify-center px-6 pt-15 pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col justify-center items-center">
          <h3 className="text-3xl font-bold text-center">
            Um pouco sobre mim
          </h3>
          <span className="h-[10px] bg-orange-500 w-1/8  mb-12"/>
        </div>
        <div className="flex justify-center items-center">
          <div className="border-3 border-orange-500 rounded-lg p-6 mx-auto shadow-md">
            <h3 className="text-5xl md:text-5xl font-extrabold mt-6 mb-8 z-10">
              Full Stack Developer
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600 "
              } text-lg md:text-xl max-w-2xl relative z-10`}>
              Estudante de Engenharia de Computação com experiência em desenvolvimento web. Construo aplicações modernas e escaláveis usando ReactJS, Next.js, Python e PostgreSQL.
            </p>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600 "
              } text-lg md:text-xl max-w-2xl mt-4 relative z-10`}>
              Atuo como desenvolvedor fullstack integrando APIs REST e colaborando com Git/GitHub, sempre priorizando performance e experiência do usuário.
            </p>
            <div className="flex gap-4 ">
              <button className="mt-8 mb-4 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                  Currículo
              </button>
            </div>
          </div>
        </div>
      </section>
          

      {/* Skills */}
      <motion.section
        id="skills"
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        } py-20 transition-colors duration-300 ease-in-out`}
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 },
          },
        }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">
              Competências
            </h3>
            <span className="h-[10px] bg-orange-500 w-1/8  mb-12"/>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className={`${
                  darkMode ? "bg-gray-900" : "bg-white"
                } rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-all duration-300 ease-in-out`}
                whileHover={{ scale: 1.05 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                {skillIcons[skill]}
                <p className="font-medium mt-2">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      

      {/* Projects */}
      <motion.section id="projects" className="py-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">
              Projetos
            </h3>
            <span className="h-[10px] bg-orange-500 w-1/8  mb-12"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <motion.div key={proj.id} className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out relative`} whileHover={{ scale: 1.05 }}>
                <span className="absolute top-0 left-3 text-4xl font-extrabold text-orange-500 opacity-40 select-none">{String(index + 1).padStart(2, '0')}</span>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {renderStatusIcon(proj.status)}
                  <span className="text-sm font-medium">
                    {proj.status}
                  </span>
                </div>
                <div className="p-6 pt-10 relative z-10">
                  <h4 className="text-xl font-semibold mb-2 flex items-center"> 
                    {proj.title}
                  </h4>
                  <span className="block text-sm font-medium text-orange-500 mt-1">
                    {proj.type}
                  </span>
                  <p className="my-3 text-sm leading-relaxed">
                    {proj.description}
                  </p>
                  <p className={`${darkMode ? "text-gray-500" : "text-gray-400"
                  }  text-xs mb-3`}>
                    {proj.tools.join(", ")}
                  </p>
                  <div className="flex gap-4 mt-4 justify-between items-center">
                    <a href={proj.source} target="_blank" rel="noopener noreferrer" className={`${darkMode ? "bg-gray-700" : "bg-gray-200"
                  }  px-3 py-1 text-sm  rounded-md hover:bg-orange-600 hover:text-white transition`}>
                      Código
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      
      {/* Experience */}
      <motion.section id="experience" className={`${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        } py-20 transition-colors duration-300 ease-in-out`} 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">
              Experiência
            </h3>
            <span className="h-[10px] bg-orange-500 w-2/12 mb-12"/>
          </div>
          <div className="relative border-l-2 border-orange-500 ml-4">
            {experiences.map((exp, index) => (
              <motion.div key={index} 
                className="mb-10 ml-6" 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.2 }} 
                viewport={{ once: true }}>
                <span className={`${darkMode ? "bg-gray-800" : "bg-gray-200  "}
                absolute -left-4 flex items-center justify-center w-8 h-8  rounded-full`}>
                  {exp.icon}
                </span>
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}
                  p-4 rounded-md shadow-md`}>
                  <h4 className="text-0.5xl font-semibold">{exp.year} - {exp.title}</h4>
                  <p className="mt-1">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contato */}
      <motion.footer
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={`${
          darkMode ? "text-gray-100" : "text-gray-800"
        } max-w-6xl mx-auto text-center py-10`}>
          <h3 className="text-2xl font-bold mb-4">Entre em Contato</h3>
          <p className="mb-6">Me envie um email ou conecte-se nas redes sociais</p>
          <div className="flex justify-center gap-6 text-3xl">
            <a href="mailto:seuemail@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaGoogle />
            </a>
            <a href="https://www.linkedin.com/in/seulinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r mb-4 from-transparent via-orange-400 to-transparent" />
        <div className="text-center text-xs pb-6">
          © {new Date().getFullYear()} Henrique Araújo Miranda · Todos os direitos reservados
        </div>
      </motion.footer>
      {showScroll && (
        <motion.button onClick={scrollToTop} className="fixed bottom-5 right-5 p-4 bg-orange-500 text-white rounded-full shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}