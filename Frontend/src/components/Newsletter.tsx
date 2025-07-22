const Newsletter = () => (
  <section className="bg-gradient-to-r from-rose-100 to-purple-100 py-16">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h3 className="text-3xl font-bold mb-4 text-slate-700">Stay Updated with Fresh Recipes</h3>
      <p className="text-slate-600 mb-8 text-lg">Get the latest Indian recipes and cooking tips delivered to your inbox weekly!</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input type="email" placeholder="Enter your email address" className="flex-1 px-6 py-3 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80" />
        <button className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);

export default Newsletter;
