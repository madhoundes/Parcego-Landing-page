import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Steps from './components/Steps';
import RateCalculator from './components/RateCalculator';
import Testimonials from './components/Testimonials';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Steps />
        <RateCalculator />
        <Testimonials />
        <ComparisonTable />
        
        {/* Final CTA */}
        <section id="cta" className="py-24 bg-white">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="bg-brand-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-brand-500/40 relative overflow-hidden"
             >
                {/* Abstract pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <motion.div 
                  style={{ translateY: -10 }}
                  whileInView={{ translateY: 0 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -top-24 -right-24 w-64 h-64 bg-accent-500 rounded-full blur-3xl mix-blend-overlay opacity-50"
                ></motion.div>
                
                <motion.div 
                   style={{ translateY: 10 }}
                   whileInView={{ translateY: 0 }}
                   transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                   className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-400 rounded-full blur-3xl mix-blend-overlay opacity-50"
                ></motion.div>

                <div className="relative z-10">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl font-heading font-bold mb-6"
                    >
                      Ready to Transform Your Shipping?
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-brand-100 text-xl mb-10 max-w-2xl mx-auto"
                    >
                      Join thousands of merchants who trust Parcego for their courier needs. Start shipping smarter today—no credit card required.
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <motion.a 
                          href="https://www.parcego.com/login"
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }} 
                          className="px-8 py-4 bg-white text-brand-600 font-bold rounded-full hover:bg-brand-50 transition-colors shadow-lg inline-block"
                        >
                          Get Started Free
                        </motion.a>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-transparent border-2 border-brand-400 text-white font-bold rounded-full hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
                          Contact Sales <ArrowRight size={18}/>
                        </motion.button>
                    </motion.div>
                </div>
             </motion.div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;