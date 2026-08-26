/**
 * Design: 정밀한 식탁 — 모든 페이지는 공통 내비게이션과 브랜드 신뢰 구조를 공유하며, 하위 페이지에도 명확한 귀환 경로를 제공한다.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { InitialBrandLoader } from "./components/InitialBrandLoader";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Company = lazy(() => import("./pages/Company"));
const Location = lazy(() => import("./pages/Location"));
const Manufacturing = lazy(() => import("./pages/Manufacturing"));
const QualitySafety = lazy(() => import("./pages/QualitySafety"));
const ResearchDevelopment = lazy(() => import("./pages/ResearchDevelopment"));
const Products = lazy(() => import("./pages/Products"));
const PizzaCollection = lazy(() => import("./pages/PizzaCollection"));
const DoughCollection = lazy(() => import("./pages/DoughCollection"));
const Partnership = lazy(() => import("./pages/Partnership"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoadingFallback() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f3eb] px-5 text-[#242321]" aria-live="polite"><div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.18em] text-[#9e3328]"><span className="h-2 w-2 rounded-full bg-[#9e3328]" />RECORD LOADING</div></main>;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Suspense fallback={<RouteLoadingFallback />}><Switch>
    <Route path="/" component={Home} />
    <Route path="/company" component={Company} />
    <Route path="/company.html" component={Company} />
    <Route path="/location" component={Location} />
    <Route path="/location.html" component={Location} />
    <Route path="/manufacturing" component={Manufacturing} />
    <Route path="/manufacturing.html" component={Manufacturing} />
    <Route path="/manufacturing/quality" component={QualitySafety} />
    <Route path="/manufacturing/quality.html" component={QualitySafety} />
    <Route path="/quality.html" component={QualitySafety} />
    <Route path="/manufacturing/research" component={ResearchDevelopment} />
    <Route path="/manufacturing/research.html" component={ResearchDevelopment} />
    <Route path="/research.html" component={ResearchDevelopment} />
    <Route path="/products" component={Products} />
    <Route path="/products.html" component={Products} />
    <Route path="/products/pizza" component={PizzaCollection} />
    <Route path="/products/pizza.html" component={PizzaCollection} />
    <Route path="/pizza.html" component={PizzaCollection} />
    <Route path="/products/dough" component={DoughCollection} />
    <Route path="/products/dough.html" component={DoughCollection} />
    <Route path="/dough.html" component={DoughCollection} />
    <Route path="/partnership" component={Partnership} />
    <Route path="/partnership.html" component={Partnership} />
    <Route path="/privacy" component={PrivacyPolicy} />
    <Route path="/privacy.html" component={PrivacyPolicy} />
    <Route path="/terms" component={TermsOfUse} />
    <Route path="/terms.html" component={TermsOfUse} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></Suspense>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><InitialBrandLoader /><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
