import Header from "@/components/Header";
import Main from "@/components/Main";
import Spotlight from "@/components/Spotlight";
import ThemeProvider from "@/components/ThemeProvider";

export default function Home() {
  return (
    <div className="relative">
      <Spotlight />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <a href="#content" className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0">Skip to Content</a>
        <div className="lg:flex lg:justify-between lg:gap-4">
        <ThemeProvider>
          <Header />
          <Main />
        </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
