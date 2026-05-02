import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { menuItems } from '../Data/menuItems'

// ── Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

// ── Steam particle ─────────────────────────────────────────
const Steam = ({ delay = 0, x = 0 }) => (
  <motion.div
    style={{
      position: 'absolute', bottom: '100%', left: `calc(50% + ${x}px)`,
      width: 3, borderRadius: 99,
      background: 'linear-gradient(to top, rgba(255,255,255,0.4), transparent)',
    }}
    animate={{ height: [0, 40, 0], opacity: [0, 0.6, 0], y: [0, -30, -60] }}
    transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
  />
)

// ── Floating Bean ──────────────────────────────────────────
const Bean = ({ top, left, delay, size = 12 }) => (
  <motion.div
    style={{
      position: 'absolute', top, left,
      width: size, height: size * 0.6,
      borderRadius: '50%',
      backgroundColor: '#6B3A2A',
      opacity: 0.6,
    }}
    animate={{ y: [0, -12, 0], rotate: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
)

// ── HERO ───────────────────────────────────────────────────
const Hero = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const { scrollY } = useScroll()
  const cupY = useTransform(scrollY, [0, isMobile ? 1000 : 600], [0, -80])
  const cupRotate = useTransform(scrollY, [0, isMobile ? 1000 : 600], [0, -8])
  const textY = useTransform(scrollY, [0, isMobile ? 800 : 400], [0, 60])
  const opacity = useTransform(scrollY, [0, isMobile ? 1200 : 500], [1, 0])

  return (
    <section className="hero-section" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'radial-gradient(ellipse at 60% 50%, #1f0e07 0%, #0a0a0a 65%)',
      overflow: 'hidden', position: 'relative', padding: '6rem 3rem 4rem',
    }}>

      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-grid" style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center',
      }}>

        {/* ── LEFT: Text ── */}
        <motion.div style={{ y: textY, opacity }} variants={stagger} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} custom={0} style={{
            color: '#c9a84c', fontSize: '0.75rem',
            letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '1.5rem',
          }}>
            ✦ Premium Coffee Experience
          </motion.p>

          <motion.h1 variants={fadeUp} custom={1} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
            fontWeight: 700, lineHeight: 1.08,
            color: '#f5f5f5', marginBottom: '1.8rem',
          }}>
            Brewed to<br />
            <span style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(135deg, #c9a84c, #e8d5a3)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
            }}>
              Perfection
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} style={{
            color: '#999', fontSize: '1.1rem', lineHeight: 1.75,
            maxWidth: 440, marginBottom: '2.8rem',
          }}>
            Experience handcrafted coffee delivered fresh, fast, and exactly how you like it.
            Every sip, a ritual worth savouring.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/menu" style={{
              background: 'linear-gradient(135deg, #c9a84c, #a8862e)',
              color: '#0a0a0a', padding: '0.85rem 2.2rem',
              borderRadius: 4, textDecoration: 'none',
              fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Order Now
            </Link>
            <Link to="/menu" style={{
              color: '#c9a84c', padding: '0.85rem 2.2rem',
              borderRadius: 4, textDecoration: 'none',
              fontWeight: 500, fontSize: '0.95rem',
              border: '1px solid rgba(201,168,76,0.35)',
              display: 'inline-block',
            }}>
              Explore Menu
            </Link>
          </motion.div>

          {/* stats row */}
          <motion.div variants={fadeUp} custom={4} style={{
            display: 'flex', gap: '2.5rem', marginTop: '3.5rem',
            paddingTop: '2rem', borderTop: '1px solid #1f1f1f',
          }}>
            {[['12+', 'Menu Items'], ['4.9★', 'Rating'], ['2k+', 'Orders']].map(([num, label]) => (
              <div key={label}>
                <p style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700 }}>{num}</p>
                <p style={{ color: '#666', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D Cup Visual ── */}
        <motion.div className="hero-cup" style={{ y: cupY, rotate: cupRotate }} initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 480 }}>

            {/* outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
              }}
            />

            {/* orbiting beans */}
            <Bean top="10%" left="15%" delay={0} size={14} />
            <Bean top="20%" left="78%" delay={1.2} size={10} />
            <Bean top="65%" left="10%" delay={0.7} size={8} />
            <Bean top="75%" left="80%" delay={1.8} size={12} />
            <Bean top="45%" left="5%" delay={2.1} size={9} />
            <Bean top="50%" left="88%" delay={0.4} size={11} />

            {/* floating cup */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* cup body */}
              <div style={{ position: 'relative', textAlign: 'center' }}>
                {/* steam */}
                <div style={{ position: 'relative', height: 60, display: 'flex', justifyContent: 'center', gap: 12 }}>
                  <Steam delay={0} x={-12} />
                  <Steam delay={0.6} x={0} />
                  <Steam delay={1.2} x={12} />
                </div>

                {/* cup emoji scaled up with glow */}
                <motion.div
                  animate={{ rotateY: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{
                    fontSize: '9rem', lineHeight: 1,
                    filter: 'drop-shadow(0 20px 60px rgba(201,168,76,0.25)) drop-shadow(0 0 30px rgba(201,168,76,0.1))',
                  }}
                >
                  ☕
                </motion.div>

                {/* reflection */}
                <div style={{
                  fontSize: '9rem', lineHeight: 1, opacity: 0.08,
                  transform: 'scaleY(-0.4) translateY(-10px)',
                  filter: 'blur(4px)',
                  maskImage: 'linear-gradient(to bottom, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
                }}>
                  ☕
                </div>
              </div>
            </motion.div>

            {/* circular label ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: 340, height: 340, borderRadius: '50%',
                border: '1px dashed rgba(201,168,76,0.15)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          color: '#333', fontSize: '0.7rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', textAlign: 'center',
        }}>
       
      </motion.div>
    </section>
  )
}

// ── FEATURED PRODUCTS ──────────────────────────────────────
const ProductCard = ({ item, i }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp} custom={i}
      whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        backgroundColor: '#111', border: `1px solid ${hovered ? '#c9a84c' : '#1e1e1e'}`,
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s', transformStyle: 'preserve-3d',
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* image area */}
      <div style={{
        height: 180, background: 'linear-gradient(135deg, #1a0f0a, #2c1810)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid #1e1e1e',
        position: 'relative', overflow: 'hidden',
      }}>
        <motion.div animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%' }}>
          <img src={item.image} alt={item.name} style={{
            width: '100%', height: '100%', objectFit: 'cover',
          }} />
        </motion.div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, rgba(201,168,76,0.12), transparent)',
          }}
        />
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{
          color: '#c9a84c', fontSize: '0.7rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          {item.category}
        </span>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          color: '#f5f5f5', fontSize: '1.25rem', margin: '0.4rem 0 0.6rem',
        }}>
          {item.name}
        </h3>
        <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem', flexGrow: 1 }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '1.15rem' }}>
            ${item.price.toFixed(2)}
          </span>
          <Link to={`/item/${item.id}`} style={{
            color: hovered ? '#0a0a0a' : '#c9a84c',
            backgroundColor: hovered ? '#c9a84c' : 'transparent',
            border: '1px solid #c9a84c',
            padding: '0.35rem 1rem', borderRadius: 4,
            textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600,
            transition: 'all 0.3s',
          }}>
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const FeaturedProducts = () => {
  const featured = menuItems.slice(0, 4)

  return (
    <section style={{ padding: '7rem 3rem', backgroundColor: '#0a0a0a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} style={{
            color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.8rem',
          }}>
            ✦ The Selection
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#f5f5f5', textAlign: 'center', marginBottom: '4rem',
          }}>
            Trending Now
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {featured.map((item, i) => (
              <ProductCard key={item.id} item={item} i={i} />
            ))}
          </div>

          <motion.div variants={fadeUp} custom={5} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" style={{
              color: '#c9a84c', fontSize: '0.9rem',
              textDecoration: 'none', letterSpacing: '0.1em',
              borderBottom: '1px solid rgba(201,168,76,0.4)',
              paddingBottom: 2,
            }}>
              View Full Menu →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ───────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { icon: '🫘', num: '01', title: 'Choose Your Coffee', desc: 'Browse our curated menu of handcrafted blends — from bold espressos to smooth lattes.' },
    { icon: '⚗️', num: '02', title: 'Customise Your Taste', desc: 'Adjust strength, milk, sweetness. Every cup made exactly to your preference.' },
    { icon: '⚡', num: '03', title: 'Fast Delivery', desc: 'Your order is freshly prepared and delivered straight to you, hot and on time.' },
  ]

  return (
    <section style={{
      padding: '7rem 3rem',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0905 50%, #0a0a0a 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, #c9a84c 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.8rem',
          }}>
          ✦ The Process
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#f5f5f5', textAlign: 'center', marginBottom: '5rem',
          }}>
          How It Works
        </motion.h2>

        <div className="steps-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem', position: 'relative',
        }}>
          {/* connecting line */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 40, left: '17%', right: '17%',
              height: 1, backgroundColor: '#2a2a2a', transformOrigin: 'left',
            }}
          />

          {steps.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ textAlign: 'center', padding: '0 1rem' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1a1a, #111)',
                border: '1px solid #2a2a2a', margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', position: 'relative', zIndex: 1,
              }}>
                {step.icon}
              </div>
              <p style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
                {step.num}
              </p>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', color: '#f5f5f5',
                fontSize: '1.2rem', marginBottom: '0.8rem',
              }}>
                {step.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── BRAND STORY (parallax) ────────────────────────────────
const BrandStory = () => {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      minHeight: 500, display: 'flex', alignItems: 'center',
    }}>
      {/* parallax bg */}
      <motion.div style={{
        position: 'absolute', inset: '-20%',
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2c1810 40%, #1a0f0a 100%)',
        y: bgY,
      }} />

      {/* overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(10,10,10,0.85), rgba(10,10,10,0.6))',
      }} />

      {/* floating beans decoration */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            style={{
              position: 'absolute',
              top: `${10 + i * 12}%`, left: `${5 + i * 11}%`,
              width: 8 + (i % 3) * 4, height: (8 + (i % 3) * 4) * 0.6,
              borderRadius: '50%', backgroundColor: '#6B3A2A', opacity: 0.2,
            }}
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto', padding: '7rem 3rem', textAlign: 'center' }}>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', marginBottom: '2rem',
          }}>
          ✦ Our Philosophy
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: '#f5e6d3',
            lineHeight: 1.5, fontStyle: 'italic',
          }}>
          "From ethically sourced beans to expertly crafted brews, every cup tells a story of passion, precision, and quality."
        </motion.h2>
        <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            width: 60, height: 1, backgroundColor: '#c9a84c',
            margin: '2.5rem auto 0',
          }} />
      </div>
    </section>
  )
}

// ── FEATURES ──────────────────────────────────────────────
const Features = () => {
  const items = [
    { icon: '⚡', title: 'Fast Delivery', desc: 'Your coffee reaches you hot, fresh, and on time — every single time.' },
    { icon: '🎨', title: 'Custom Orders', desc: 'Dial in your perfect cup. Strength, milk, sugar — all your way.' },
    { icon: '🫘', title: 'Premium Beans', desc: 'Single-origin, ethically sourced beans from the world\'s finest estates.' },
    { icon: '💳', title: 'Easy Payments', desc: 'Seamless checkout. Order in seconds, enjoy in minutes.' },
  ]

  return (
    <section style={{ padding: '7rem 3rem', backgroundColor: '#080808' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.8rem',
          }}>
          ✦ Why Coffine
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
          viewport={{ once: true }} style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#f5f5f5', textAlign: 'center', marginBottom: '4rem',
          }}>
          Built for Coffee Lovers
        </motion.h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {items.map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#111', border: '1px solid #1a1a1a',
                borderRadius: 10, padding: '2rem',
              }}>
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }}
                style={{ fontSize: '2rem', marginBottom: '1.2rem', display: 'inline-block' }}>
                {item.icon}
              </motion.div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', color: '#f5f5f5',
                fontSize: '1.1rem', marginBottom: '0.6rem',
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ─────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{
    padding: '8rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
    background: 'radial-gradient(ellipse at center, #1a0f0a 0%, #0a0a0a 70%)',
  }}>
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity }}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true }} style={{
        color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.35em',
        textTransform: 'uppercase', marginBottom: '1.5rem',
      }}>
      ✦ Ready?
    </motion.p>

    <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
      viewport={{ once: true }} style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
        color: '#f5f5f5', lineHeight: 1.15, marginBottom: '1.5rem',
      }}>
      Your perfect cup is<br />
      <span style={{
        color: 'transparent',
        backgroundImage: 'linear-gradient(135deg, #c9a84c, #e8d5a3)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text',
      }}>
        one tap away.
      </span>
    </motion.h2>

    <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible"
      viewport={{ once: true }} style={{ marginTop: '2.5rem' }}>
      <Link to="/menu" style={{
        background: 'linear-gradient(135deg, #c9a84c, #a8862e)',
        color: '#0a0a0a', padding: '1rem 3rem',
        borderRadius: 4, textDecoration: 'none',
        fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em',
        display: 'inline-block',
      }}>
        Order Now
      </Link>
    </motion.div>
  </section>
)

// ── ROOT ──────────────────────────────────────────────────
const Homepage = () => (
  <div style={{ backgroundColor: '#0a0a0a', overflowX: 'hidden' }}>
    <Hero />
    <FeaturedProducts />
    <HowItWorks />
    <BrandStory />
    <Features />
    <FinalCTA />
  </div>
)

export default Homepage