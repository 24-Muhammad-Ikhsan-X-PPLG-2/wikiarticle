import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/5 dark:via-indigo-500/5 dark:to-purple-500/5 rounded-3xl blur-3xl -z-10"></div>

        <div className="bg-linear-to-br from-blue-600 to-indigo-600 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-3xl p-12 sm:p-16 border border-blue-500/20 dark:border-blue-500/10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-2xl translate-y-8 -translate-x-8"></div>

          <div className="relative z-10 text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Limited Time Offer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Join our Community Today
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Start contributing to the world's knowledge base. Sign up now
                and get exclusive access to premium features.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 space-y-3">
              <p className="text-white/60 text-sm">
                ✓ No credit card required • ✓ Free forever tier • ✓ Easy to
                upgrade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
