import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="py-8">
        <section className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center mb-4">
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground mb-6">
              <Link href="/about" className="hover:text-foreground transition-colors">
                what is this?
              </Link>
            </div>
            <Link href="/">
              <Image
                src="/generative-strategies-logo2-transparent.png"
                alt="Generative Strategy Cards"
                width={400}
                height={133}
                className="mx-auto mb-1 cursor-pointer"
                priority
              />
            </Link>
          </div>
        </section>
      </header>

      <main className="container mx-auto flex-1 py-1 px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          <h1 className="sr-only">About</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg leading-relaxed mb-6 font-sans font-bold">
              Generative Strategies are methodologies for lateral machine-thinking.
            </p>
            
            <p className="text-base leading-relaxed mb-6 font-sans">
              They can be applied in variety of contexts when interacting with LLM's. Copy and paste these on codebases, research datasets, or against your own prompts.
            </p>
            
            <p className="text-base leading-relaxed mb-6 font-sans">
              They are extremely valuable when used on larger datasets, both qualitative and quantitative. You can <a href="#" className="text-primary hover:underline">see a few experiments here</a>.
            </p>
            
            <p className="text-base leading-relaxed mb-6 font-sans">
              These were originally developed at The New York Times by Luis Queral and the Generative Design team.
            </p>
            
            <div className="font-sans">
              <p className="text-base leading-relaxed mb-3">
                <strong>Thank you to friends who have contributed!</strong>
              </p>
              <div className="text-base leading-relaxed space-y-1">
                <p>Meg Dholakia</p>
                <p>Nina Feinberg</p>
                <p>Bon Champion</p>
                <p>Sarah Fawwson</p>
                <p>Yvonne Tran</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link 
              href="/"
              className="inline-flex items-center text-primary hover:underline font-sans font-medium"
            >
              ← Back to Strategy Cards
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
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