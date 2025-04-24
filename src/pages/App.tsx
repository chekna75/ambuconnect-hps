import React from "react";
import { CheckCircle, Clock, Shield, Users, ChevronDown } from 'lucide-react';
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { Header } from "@radix-ui/react-accordion";

// Définition des couleurs principales
const colors = {
  primary: "#7CC1D8", // Bleu clair du logo
  primaryLight: "#023047", // Bleu foncé pour les fonds
  primaryDark: "#5A8F9E", // Version plus foncée pour les hover
  gray: "#333333", // Couleur grise/noire du logo pour "AMBU"
  secondary: "#2A4C56", // Bleu foncé pour les textes importants
  accent: "#F0F9FB", // Bleu très clair pour les fonds
  text: {
    primary: "#333333", // Pour les titres, utilisant la couleur grise du logo
    secondary: "#5A8F9E", // Pour les textes moins importants
    light: "#FFFFFF" // Pour le texte sur fond foncé
  }
};

const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Logo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#7CC1D8]"
    >
      <path
        d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z"
        fill="currentColor"
      />
    </svg>
    <div className="text-3xl font-bold tracking-wider">
      <span style={{ color: colors.gray }}>AMBU</span>
      <span className="text-[#7CC1D8]">CONNECT</span>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={false}
      animate={{ height: isOpen ? "auto" : "60px" }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-ambu-dark">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-ambu-blue" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Section Hero */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="bg-gradient-to-br from-white to-primaryLight py-16 px-4 md:py-24"
        style={{ backgroundColor: colors.accent }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div variants={fadeInUp} className="flex-1 space-y-6 max-w-xl">
              <div className="mb-8">
                <Logo />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: colors.text.primary }}>
                <span style={{ color: colors.primary }}>Simplifiez</span> la Gestion de vos Transports Médicaux
              </h1>
              <p className="text-lg md:text-xl" style={{ color: colors.text.secondary }}>
                AmbuConnect révolutionne la coordination des transports médicaux. Optimisez vos flux, réduisez les temps d'attente et améliorez la satisfaction de vos patients.
              </p>
              <motion.div 
                variants={fadeInUp}
                className="flex gap-4 pt-4"
              >
                <CTAButton 
                  to="/contact" 
                  size="lg"
                  className="bg-[#023047] text-white hover:bg-[#034267] transition-colors"
                >
                  Demander une Démo
                </CTAButton>
              </motion.div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="flex-1 flex justify-center"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <Logo />
                </div>
                <h3 className="text-xl font-semibold text-center mb-6" style={{ color: colors.text.primary }}>
                  Pourquoi Choisir AmbuConnect ?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Réduction de 40% des temps d'attente",
                    "Coordination en temps réel avec les ambulances",
                    "Interface intuitive et facile à utiliser",
                    "Support technique 24/7"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <div className="rounded-full p-1" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span style={{ color: colors.text.secondary }}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section Comment ça marche */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="py-16 px-4 bg-white"
      >
        <div className="container mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.text.primary }}
          >
            Comment ça marche ?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Créez votre demande",
                description: "Remplissez notre formulaire simplifié en moins de 2 minutes. Toutes les informations essentielles sont capturées automatiquement.",
                icon: <Clock className="h-10 w-10" style={{ color: colors.primary }} />
              },
              {
                title: "2. Notre système s'occupe du reste",
                description: "AmbuConnect trouve automatiquement l'ambulance la plus proche et la mieux adaptée à vos besoins.",
                icon: <Shield className="h-10 w-10" style={{ color: colors.primary }} />
              },
              {
                title: "3. Suivez en temps réel",
                description: "Recevez des notifications en temps réel et suivez l'avancement de votre demande sur notre tableau de bord intuitif.",
                icon: <Users className="h-10 w-10" style={{ color: colors.primary }} />
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                style={{ borderColor: colors.primaryLight }}
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: colors.text.primary }}>{step.title}</h3>
                <p style={{ color: colors.text.secondary }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section FAQ */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="py-16 px-4"
        style={{ backgroundColor: colors.accent }}
      >
        <div className="container mx-auto max-w-3xl">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
            style={{ color: colors.text.primary }}
          >
            Questions Fréquentes
          </motion.h2>
          
          <motion.div variants={staggerContainer} className="bg-white rounded-xl p-6 shadow-sm">
            {[
              {
                question: "Combien de temps faut-il pour mettre en place AmbuConnect ?",
                answer: "La mise en place est rapide et simple. En moyenne, nos clients sont opérationnels en moins de 24 heures. Notre équipe vous accompagne à chaque étape du processus."
              },
              {
                question: "Quels types d'établissements peuvent utiliser AmbuConnect ?",
                answer: "AmbuConnect est adapté à tous les établissements de santé : hôpitaux, cliniques, maisons de retraite, centres de dialyse, etc. Notre solution est modulaire et s'adapte à vos besoins spécifiques."
              },
              {
                question: "Comment AmbuConnect garantit-il la sécurité des données ?",
                answer: "Nous utilisons les standards les plus élevés de sécurité des données, avec un chiffrement de bout en bout et des certifications strictes. Vos données sont hébergées en France et conformes au RGPD."
              },
              {
                question: "Quel est le coût de la solution ?",
                answer: "Nous proposons différents forfaits adaptés à la taille de votre établissement. Contactez-nous pour une démonstration personnalisée et un devis sur mesure."
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section Appel à l'Action */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="py-12 px-4"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="container mx-auto text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold mb-6 text-white"
          >
            Prêt à transformer votre gestion des transports ?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg mb-8 text-white opacity-90 max-w-2xl mx-auto"
          >
            Rejoignez les établissements de santé qui ont déjà optimisé leur gestion des transports avec AmbuConnect.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center"
          >
            <CTAButton 
              to="/contact" 
              size="lg"
              className="bg-[#023047] text-white hover:bg-[#034267] transition-colors"
            >
              Parler à un Expert
            </CTAButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Pied de Page */}
      <footer className="py-8 px-4 mt-auto" style={{ backgroundColor: colors.secondary }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo />
            </div>
            <div className="text-sm" style={{ color: colors.text.light }}>
              © {new Date().getFullYear()} AmbuConnect. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
