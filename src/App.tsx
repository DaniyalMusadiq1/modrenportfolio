import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import './App.css'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Database, 
  Globe, 
  Server,
  Menu,
  X,
  Cpu,
  Layers,
  GitBranch,
  Monitor,
  FileCode,
  Play,
  Copy,
  Check,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Briefcase,
  User,
  Send
} from 'lucide-react'

// ==================== COMPONENTS ====================

// Theme Toggle Component
function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// Matrix Rain Background
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = resolvedTheme === 'dark'
    const chars = isDark 
      ? '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      : '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*'
    
    const fontSize = 14
    let columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops.length = columns
      drops.fill(1)
    }

    resize()
    window.addEventListener('resize', resize)

    let animationId: number

    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isDark ? '#00ff41' : '#228be6'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="matrix-canvas" />
}

// Terminal Window Component
function TerminalWindow({ children, title = "terminal", className = "" }: { children: React.ReactNode; title?: string; className?: string }) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-button red" />
        <div className="terminal-button yellow" />
        <div className="terminal-button green" />
        <span className="ml-4 text-muted-foreground text-xs font-mono flex items-center gap-2">
          <FileCode size={12} />
          {title}
        </span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  )
}

// Code Block Component
function CodeBlock({ 
  code, 
  filename = "script.js",
  showLineNumbers = true 
}: { 
  code: string; 
  filename?: string;
  showLineNumbers?: boolean 
}) {
  const [copied, setCopied] = useState(false)
  const lines = code.trim().split('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightCode = (line: string) => {
    return line
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/\b(const|let|var|function|return|import|export|from|async|await|if|else|for|while|class|interface|type|extends|implements|new|this|try|catch|throw)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/\b(console|log|error|warn|document|window|require|module|exports|process|Buffer)\b/g, '<span class="code-function">$1</span>')
      .replace(/(['"`].*?['"`])/g, '<span class="code-string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      .replace(/([{}[\]()])/g, '<span class="code-operator">$1</span>')
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot red" />
          <div className="code-dot yellow" />
          <div className="code-dot green" />
        </div>
        <span className="code-filename">{filename}</span>
        <button 
          onClick={handleCopy}
          className="ml-auto text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="flex">
        {showLineNumbers && (
          <div className="line-numbers py-5 pl-4 pr-4">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre className="code-content flex-1">
          <code dangerouslySetInnerHTML={{ __html: lines.map(highlightCode).join('\n') }} />
        </pre>
      </div>
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home', icon: Monitor },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FileCode },
    { name: 'Contact', href: '#contact', icon: Send },
  ]

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-xl border-b border-border py-3 shadow-lg' 
          : 'py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-lg transition-all duration-300 ${
            resolvedTheme === 'dark' 
              ? 'bg-[#00ff41] text-black group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]' 
              : 'bg-[#228be6] text-white group-hover:shadow-[0_0_20px_rgba(34,139,230,0.5)]'
          }`}>
            &lt;/&gt;
          </div>
          <span className="font-bold text-lg hidden sm:block">Daniyal</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="nav-link flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <link.icon size={14} />
              <span>{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-accent/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border"
          >
            <div className="flex flex-col py-4 px-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/5 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const { resolvedTheme } = useTheme()
  const heroCode = `const developer = {
  name: "Daniyal Musadiq",
  role: "Full Stack Developer",
  location: "Islamabad, Pakistan",
  skills: ["React", "Node.js", "Laravel", "TypeScript"],
  passion: "Building digital experiences",
  
  init: function() {
    console.log("Welcome to my portfolio! 👋");
    return this.createAwesomeStuff();
  }
};`

  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden grid-bg">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float opacity-20 ${
          resolvedTheme === 'dark' ? 'bg-[#00ff41]' : 'bg-[#228be6]'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-float opacity-15 ${
          resolvedTheme === 'dark' ? 'bg-[#00ff41]' : 'bg-[#228be6]'
        }`} style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-medium ${
                resolvedTheme === 'dark' 
                  ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30' 
                  : 'bg-[#228be6]/10 text-[#228be6] border border-[#228be6]/30'
              }`}>
                <Sparkles size={14} />
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Code Enthusiast',
                    2000,
                    'Open Source Contributor',
                    2000,
                  ]}
                  repeat={Infinity}
                />
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-muted-foreground font-mono">&lt;</span>
              DANIYAL
              <br />
              <span className={`font-mono ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>
                MUSADIQ
              </span>
              <span className="text-muted-foreground font-mono">/&gt;</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-8 font-mono"
            >
              <span className="code-keyword">import</span> 
              <span className="code-string"> {'{ Creativity, Code, Coffee }'} </span>
              <span className="code-keyword">from</span> 
              <span className="code-string"> "life"</span>;
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#projects" className="btn-primary">
                <Play size={18} />
                View Projects
              </a>
              <a href="#contact" className="btn-secondary">
                <Send size={18} />
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-3 mt-8 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/DaniyalMusadiq1", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:daniyalabbasi0349@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Code Window */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <CodeBlock 
              code={heroCode}
              filename="developer.js"
            />
            
            {/* Terminal output */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-4 terminal-window"
            >
              <div className="terminal-body font-mono text-sm">
                <p className="terminal-prompt flex items-center gap-2">
                  <ChevronDown size={14} />
                  node developer.js
                </p>
                <div className="mt-3 space-y-1.5 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Check size={14} className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} />
                    Initializing portfolio...
                  </p>
                  <p className="flex items-center gap-2">
                    <Check size={14} className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} />
                    Loading skills: React, Node.js, Laravel...
                  </p>
                  <p className="flex items-center gap-2">
                    <Check size={14} className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} />
                    Welcome to my digital space! 👋
                  </p>
                </div>
                <p className="terminal-prompt mt-4 flex items-center gap-2">
                  <ChevronDown size={14} />
                  <span className="cursor-blink">_</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground text-xs font-mono">scroll.down()</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          >
            <div className={`w-1.5 h-3 rounded-full mt-2 ${resolvedTheme === 'dark' ? 'bg-[#00ff41]' : 'bg-[#228be6]'}`} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const aboutCode = `// about-me.ts
interface Developer {
  name: string;
  experience: number;
  location: string;
  passion: string[];
}

const daniyal: Developer = {
  name: "Daniyal Musadiq",
  experience: 5,
  location: "Islamabad, Pakistan",
  passion: [
    "Clean Code",
    "Problem Solving", 
    "Modern Web Tech",
    "Open Source"
  ]
};

export default daniyal;`

  const stats = [
    { label: 'Years Coding', value: '5+', icon: Code2 },
    { label: 'Projects Built', value: '50+', icon: FileCode },
    { label: 'Technologies', value: '15+', icon: Cpu },
    { label: 'Coffee Cups', value: '∞', icon: Monitor },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className={`font-mono text-sm mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>// Section: About</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-muted-foreground font-mono">class</span>{" "}
            <span className="code-class">AboutMe</span>{" "}
            <span className="text-muted-foreground font-mono">{"{"}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Code Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <CodeBlock 
              code={aboutCode}
              filename="about-me.ts"
            />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="terminal-window p-4 text-center hover:border-accent/50 transition-colors hover-lift"
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`} />
                  <p className="font-mono text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-xs font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="terminal-window p-6">
              <p className="font-mono text-muted-foreground leading-relaxed mb-4">
                <span className="code-keyword">const</span>{" "}
                <span className="code-variable">bio</span> = {""}
                <span className="code-string">"</span>
              </p>
              <p className="text-foreground leading-relaxed pl-4">
                Full Stack Developer with hands-on experience in React.js, Node.js, and Laravel. 
                I build scalable and high-performance web applications with a passion for clean code 
                and modern technologies.
              </p>
              <p className="text-foreground leading-relaxed mt-4 pl-4">
                Skilled in designing robust backend systems and RESTful APIs. I collaborate effectively 
                with teams to implement features, perform code reviews, and manage projects using Git/GitHub.
              </p>
              <p className="font-mono text-muted-foreground mt-4">
                <span className="code-string">"</span>;
              </p>
            </div>

            {/* Personal Info */}
            <div className="terminal-window p-6">
              <p className="font-mono code-comment mb-4">// Contact Information</p>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { icon: MapPin, label: 'location', value: 'Islamabad, Pakistan' },
                  { icon: Mail, label: 'email', value: 'daniyalabbasi0349@gmail.com' },
                  { icon: Phone, label: 'phone', value: '+92 347 5544614' },
                  { icon: Globe, label: 'languages', value: '["English", "Urdu"]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 flex-wrap">
                    <item.icon size={16} className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} />
                    <span className="text-muted-foreground">{item.label}:</span>
                    <span className="code-string">"{item.value}"</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-muted-foreground mt-12 font-mono"
        >
          {"}"}
        </motion.p>
      </div>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills = {
    frontend: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript', level: 95 },
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Laravel', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 92 },
    ],
    database: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 75 },
    ],
    tools: [
      'Git', 'GitHub', 'Docker', 'AWS', 'VS Code', 
      'Postman', 'Figma', 'Linux', 'Nginx'
    ]
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className={`font-mono text-sm mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>// Section: Skills</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono">
            <span className="code-keyword">import</span>{" "}
            <span className="code-string">{'{ Skills }'}</span>{" "}
            <span className="code-keyword">from</span>{" "}
            <span className="code-string">"./tech-stack"</span>;
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="terminal-window p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Monitor className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} size={24} />
              <h3 className="text-xl font-bold">Frontend</h3>
            </div>
            <div className="space-y-4">
              {skills.frontend.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-sm text-muted-foreground">{skill.name}</span>
                    <span className={`font-mono text-sm ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className={`h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-gradient-to-r from-[#00ff41] to-[#00cc33]' : 'bg-gradient-to-r from-[#228be6] to-[#1c7ed6]'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="terminal-window p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Server className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} size={24} />
              <h3 className="text-xl font-bold">Backend</h3>
            </div>
            <div className="space-y-4">
              {skills.backend.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-sm text-muted-foreground">{skill.name}</span>
                    <span className={`font-mono text-sm ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-gradient-to-r from-[#00ff41] to-[#00cc33]' : 'bg-gradient-to-r from-[#228be6] to-[#1c7ed6]'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Database Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="terminal-window p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} size={24} />
              <h3 className="text-xl font-bold">Database</h3>
            </div>
            <div className="space-y-4">
              {skills.database.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-sm text-muted-foreground">{skill.name}</span>
                    <span className={`font-mono text-sm ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className={`h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-gradient-to-r from-[#00ff41] to-[#00cc33]' : 'bg-gradient-to-r from-[#228be6] to-[#1c7ed6]'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="terminal-window p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Layers className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} size={24} />
              <h3 className="text-xl font-bold">Tools & Platforms</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="skill-badge"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Experience Section
function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      company: 'Pace Technologies',
      role: 'Full Stack Developer',
      period: 'Nov 2025 - Present',
      type: 'on-site',
      description: [
        'Developed scalable full-stack web applications using React.js, Laravel, and Tailwind CSS',
        'Collaborated in an Agile team environment, implementing features and conducting code reviews',
        'Optimized backend performance by designing RESTful APIs and improving Laravel architecture',
      ],
      tech: ['React', 'Laravel', 'Tailwind', 'MySQL'],
    },
    {
      company: 'Codes Vista',
      role: 'Full Stack Developer',
      period: 'Feb 2025 - Oct 2025',
      type: 'On-site',
      description: [
        'Designed and optimized RESTful APIs in Node.js, improving backend performance',
        'Enhanced user interfaces with modern frontend practices, improving usability across devices',
        'Ensured maintainable and scalable architecture for long-term project growth',
      ],
      tech: ['Node.js', 'Express', 'MongoDB', 'React'],
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className={`font-mono text-sm mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>// Section: Experience</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono">
            <span className="code-variable">git</span>{" "}
            <span className="text-foreground">log</span>{" "}
            <span className="text-muted-foreground">--oneline</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="terminal-window overflow-hidden group hover:border-accent/30 transition-all hover-lift"
            >
              <div className="p-5 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
                  {/* Commit info */}
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch size={16} className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'} />
                      <span className="font-mono text-xs text-muted-foreground">commit {`a${index + 1}b2c3d`}</span>
                    </div>
                    <p className={`font-mono text-sm ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>{exp.period}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-muted rounded text-xs text-muted-foreground font-mono">
                      {exp.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-muted-foreground mb-4 font-mono">@ {exp.company}</p>
                    
                    <div className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <span className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}>+</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted border border-border rounded text-xs text-muted-foreground font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with modular architecture, RESTful API design, and secure authentication.',
      image: '/project-ecommerce.jpg',
      tech: ['React.js', 'Laravel', 'MySQL', 'REST API'],
      github: 'https://github.com/DaniyalMusadiq1/E-Commerce-.git',
      code: `// Product API Endpoint
app.get('/api/products', async (req, res) => {
  const products = await Product
    .find()
    .populate('category')
    .limit(20);
  res.json({ success: true, data: products });
});`,
    },
    {
      title: 'SITA Onboarding',
      description: 'Thread-based interaction system with secure file storage, contextual access control, and automated cleanup.',
      image: '/project-sita.jpg',
      tech: ['React.js', 'Node.js', 'MongoDB', 'WebSocket'],
      live: 'https://sitaonboarding.pacemis.com/',
      code: `// Thread Management
const createThread = async (userId, data) => {
  const thread = new Thread({
    author: userId,
    prompts: [],
    accessControl: data.permissions
  });
  return await thread.save();
};`,
    },
    {
      title: 'Sports Management System',
      description: 'Backend for sports platform with structured routing, data models, and modular API architecture.',
      image: '/project-sports.jpg',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: 'https://github.com/DaniyalMusadiq1/Sports-Backend.git',
      code: `// Player Statistics Route
router.get('/stats/:playerId', 
  authMiddleware,
  async (req, res) => {
    const stats = await PlayerStats
      .aggregate([{ $match: { player: req.params.playerId }}]);
    res.json(stats);
  }
);`,
    },
    {
      title: 'Trio Trips',
      description: 'Full-stack travel booking platform with trip planning, booking management, and user dashboards.',
      image: '/project-trio.jpg',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/DaniyalMusadiq1/triotrip.git',
      code: `// Booking Controller
exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    trip: req.body.tripId,
    status: 'pending'
  });
  await sendEmail(booking);
  res.status(201).json(booking);
};`,
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className={`font-mono text-sm mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>// Section: Projects</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono">
            <span className="code-variable">ls</span>{" "}
            <span className="text-foreground">-la</span>{" "}
            <span className="code-string">~/projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="project-card group"
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Overlay links */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-all"
                      aria-label="View on GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-all"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted border border-border rounded text-xs text-accent font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Code Preview */}
                <div className="code-block">
                  <div className="code-header">
                    <div className="code-dots">
                      <div className="code-dot red" />
                      <div className="code-dot yellow" />
                      <div className="code-dot green" />
                    </div>
                    <span className="code-filename">snippet.js</span>
                  </div>
                  <pre className="code-content text-xs max-h-32 overflow-y-auto">
                    <code>{project.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactCommands = [
    { cmd: 'email.send()', output: 'daniyalabbasi0349@gmail.com', icon: Mail, href: 'mailto:daniyalabbasi0349@gmail.com' },
    { cmd: 'phone.call()', output: '+92 347 5544614', icon: Phone, href: 'tel:+923475544614' },
    { cmd: 'location.get()', output: 'Islamabad, Pakistan', icon: MapPin, href: '#' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className={`font-mono text-sm mb-2 ${resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}`}>// Section: Contact</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono">
            <span className="code-keyword">await</span>{" "}
            <span className="code-variable">contact</span>
            <span className="text-foreground">.</span>
            <span className="code-function">init</span>
            <span className="text-foreground">()</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 font-mono">
            Ready to build something amazing together? Let's connect!
          </p>
        </motion.div>

        {/* Terminal Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <TerminalWindow title="contact.sh" className="mb-8">
            <div className="space-y-4">
              {contactCommands.map((item, index) => (
                <motion.div
                  key={item.cmd}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className="terminal-prompt mb-1 flex items-center gap-2">
                    <ChevronDown size={14} />
                    {item.cmd}
                  </p>
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <item.icon size={18} />
                    <span className="font-mono">{item.output}</span>
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="pt-4 border-t border-border"
              >
                <p className="terminal-prompt mb-3 flex items-center gap-2">
                  <ChevronDown size={14} />
                  social.links
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/DaniyalMusadiq1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github size={18} />
                    <span className="font-mono">GitHub</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Linkedin size={18} />
                    <span className="font-mono">LinkedIn</span>
                  </a>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="terminal-prompt mt-4 flex items-center gap-2"
              >
                <ChevronDown size={14} />
                <span className="cursor-blink">_</span>
              </motion.p>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const { resolvedTheme } = useTheme()
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-mono text-center sm:text-left">
            <span className="code-comment">//</span> © 2026 Daniyal Musadiq. Built with React + ❤️
          </p>
          <p className="text-muted-foreground text-sm font-mono">
            <span className={resolvedTheme === 'dark' ? 'text-[#00ff41]' : 'text-[#228be6]'}>console</span>.log(
            <span className="code-string">"Thanks for visiting!"</span>
            );
          </p>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN APP ====================

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ExperienceSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
