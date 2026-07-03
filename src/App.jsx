import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AppInitializer } from "@/components/AppInitializer";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import About from "@/pages/About";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const queryClient = new QueryClient();
function Router() {
  return /*#__PURE__*/_jsxs(Switch, {
    children: [/*#__PURE__*/_jsx(Route, {
      path: "/",
      component: Home
    }), /*#__PURE__*/_jsx(Route, {
      path: "/learn",
      component: Learn
    }), /*#__PURE__*/_jsx(Route, {
      path: "/about",
      component: About
    }), /*#__PURE__*/_jsx(Route, {
      component: NotFound
    })]
  });
}
function App() {
  return /*#__PURE__*/_jsx(LoadingProvider, {
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      defaultTheme: "system",
      storageKey: "mathslab-theme",
      children: /*#__PURE__*/_jsx(LanguageProvider, {
        children: /*#__PURE__*/_jsx(QueryClientProvider, {
          client: queryClient,
          children: /*#__PURE__*/_jsxs(TooltipProvider, {
            children: [/*#__PURE__*/_jsx(HelmetProvider, {
              children: /*#__PURE__*/_jsxs("div", {
                className: "min-h-screen bg-background font-sans",
                children: [/*#__PURE__*/_jsx(AppInitializer, {}), /*#__PURE__*/_jsx(LoadingScreen, {}), /*#__PURE__*/_jsxs(WouterRouter, {
                  base: import.meta.env.BASE_URL.replace(/\/$/, ""),
                  children: [/*#__PURE__*/_jsx(Navbar, {}), /*#__PURE__*/_jsx(Router, {})]
                })]
              })
            }), /*#__PURE__*/_jsx(Toaster, {})]
          })
        })
      })
    })
  });
}
export default App;