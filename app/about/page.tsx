import Link from "next/link";
import Image from "next/image";

export default function About() {
      return (
    <div className="flex min-h-screen flex-col" style={{backgroundColor: '#f9f9f9'}}>
      <header className="pt-8 pb-2">
        <section className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center mb-1">
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground mb-6">
              <Link href="/about" className="hover:text-foreground hover:underline transition-all active:translate-y-0.5">
                what is this?
              </Link>
            </div>
            <Link href="/">
              <Image
                src="/generative-strategies-logo2-transparent.png"
                alt="Generative Strategy Cards"
                width={400}
                height={133}
                className="mx-auto mb-1 cursor-pointer transition-transform active:translate-y-0.5"
                priority
              />
            </Link>
          </div>
        </section>
      </header>

      <main className="container mx-auto flex-1 py-0 px-4 md:px-8 mb-16">
        <div className="max-w-xl mx-auto">
          <h1 className="sr-only">About</h1>
          
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-lg leading-relaxed mb-6 font-sans font-bold">
                <em>Generative Strategies</em> are prompts for <a href="https://en.wikipedia.org/wiki/Lateral_thinking" className="text-muted-foreground hover:text-foreground hover:underline">lateral thinking</a>.
              </p>
              
              <p className="text-base leading-relaxed mb-6 font-sans">
                This curated collection of prompts are designed to be used with Large Language Models (LLM's) to inspire momentum through unexpected and entertaining results.
              </p>
              
              <p className="text-base leading-relaxed mb-6 font-sans">
                Copy and paste these prompts when working with codebases, research datasets, or against your own prompts. They are particularly useful on larger datasets, both qualitative and quantitative.
              </p>
              
              <p className="text-base leading-relaxed mb-6 font-sans">
                These were originally developed at The New York Times by <a href="http://queral.studio" className="text-muted-foreground hover:text-foreground hover:underline">Luis Queral</a> and the Generative Design team.
              </p>
              
              <p className="text-base leading-relaxed mb-6 font-sans">
                Lovingly inspired by <a href="https://en.wikipedia.org/wiki/Brian_Eno" className="text-muted-foreground hover:text-foreground hover:underline">Brian Eno</a> and <a href="https://en.wikipedia.org/wiki/Peter_Schmidt_(artist)" className="text-muted-foreground hover:text-foreground hover:underline">Peter Schmidt</a>'s <a href="https://en.wikipedia.org/wiki/Oblique_Strategies" className="text-muted-foreground hover:text-foreground hover:underline">Oblique Strategies</a>.
              </p>
              
              <div className="font-sans">
                <p className="text-base leading-relaxed mb-3">
                  <strong>Special Shoutout:</strong>
                </p>
                <ul className="list-disc list-inside text-base leading-relaxed space-y-1">
                  <li>Meg Dholakia</li>
                  <li>Nina Feinberg</li>
                  <li>Bon Champion</li>
                  <li>Sarah Fawwson</li>
                  <li>Yvonne Tran</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-mono">
          <p>
            a project by Luis Queral — <a 
              href="https://queral.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              queral.studio
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
} 