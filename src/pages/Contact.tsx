import { useState } from 'react';

interface ContactForm {
  nom: string;
  email: string;
  message: string;
  sujet: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    nom: '',
    email: '',
    message: '',
    sujet: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulation d'un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Formulaire soumis:', formData);
      setSubmitStatus('success');
      setFormData({ nom: '', email: '', message: '', sujet: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-ambu-blue">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-ambu-blue via-ambu-blue/90 to-ambu-dark opacity-90" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Contactez-nous
            </h1>
            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-xl text-white/90">
                Nous sommes là pour répondre à vos questions et vous accompagner dans l'utilisation de notre plateforme.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:space-x-6">
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-ambu-dark hover:bg-white hover:text-ambu-dark transition-all duration-200"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appelez-nous
                </a>
                <a
                  href="mailto:contact@ambuconnect.fr"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-ambu-dark transition-all duration-200"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Envoyez un email
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
            <path d="M0 48h1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0v48z" />
          </svg>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-8 py-10 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-ambu-dark">Envoyez-nous un message</h2>
                <p className="mt-4 text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="block text-sm font-medium text-ambu-dark">
                      Nom complet
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        required
                        className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambu-blue focus:border-ambu-blue transition duration-200"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-ambu-dark">
                      Email
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambu-blue focus:border-ambu-blue transition duration-200"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="sujet" className="block text-sm font-medium text-ambu-dark">
                    Sujet
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select
                      name="sujet"
                      id="sujet"
                      required
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambu-blue focus:border-ambu-blue transition duration-200 appearance-none bg-white"
                      value={formData.sujet}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="creation-compte">Demande de création de compte</option>
                      <option value="support">Support technique</option>
                      <option value="commercial">Question commerciale</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-ambu-dark">
                    Message
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute top-3 left-4">
                      <svg className="h-5 w-5 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={6}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambu-blue focus:border-ambu-blue transition duration-200"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-ambu-blue hover:bg-ambu-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ambu-blue transition-all duration-200 transform hover:scale-105 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-ambu-dark mb-8 text-center">Comment nous contacter</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Email Card */}
              <div className="group relative bg-gradient-to-br from-ambu-blue/5 to-ambu-dark/5 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-ambu-blue/10 to-ambu-dark/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-ambu-blue/10 rounded-full p-4 mb-4 group-hover:bg-ambu-blue/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-ambu-dark mb-2">Email</h3>
                  <p className="text-gray-600 mb-4">Envoyez-nous un message</p>
                  <a href="mailto:contact@ambuconnect.fr" className="text-ambu-blue hover:text-ambu-dark transition-colors duration-200 font-medium">
                    contact@ambuconnect.fr
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative bg-gradient-to-br from-ambu-blue/5 to-ambu-dark/5 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-ambu-blue/10 to-ambu-dark/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-ambu-blue/10 rounded-full p-4 mb-4 group-hover:bg-ambu-blue/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-ambu-dark mb-2">Téléphone</h3>
                  <p className="text-gray-600 mb-4">Appelez-nous</p>
                  <a href="tel:+33123456789" className="text-ambu-blue hover:text-ambu-dark transition-colors duration-200 font-medium">
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="group relative bg-gradient-to-br from-ambu-blue/5 to-ambu-dark/5 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-ambu-blue/10 to-ambu-dark/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-ambu-blue/10 rounded-full p-4 mb-4 group-hover:bg-ambu-blue/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-ambu-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-ambu-dark mb-2">Adresse</h3>
                  <p className="text-gray-600 mb-4">Venez nous voir</p>
                  <a 
                    href="https://www.google.com/maps?q=123+Avenue+de+la+République,+75011+Paris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ambu-blue hover:text-ambu-dark transition-colors duration-200 font-medium"
                  >
                    123 Avenue de la République<br />
                    75011 Paris
                  </a>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="mt-12">
              <div className="bg-gradient-to-br from-ambu-blue/5 to-ambu-dark/5 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-ambu-dark mb-6 text-center">Horaires d'ouverture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-200">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium text-ambu-dark">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-200">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium text-ambu-dark">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-200">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium text-ambu-dark">Fermé</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-200">
                    <span className="text-gray-600">Urgences</span>
                    <span className="font-medium text-ambu-dark">24h/24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 