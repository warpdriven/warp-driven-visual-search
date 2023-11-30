// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";

// Pages Imports
// import { Home } from "@/pages/home";
import { Detail } from "@/pages/detail";
// import { Cart } from "@/pages/cart";
import { List } from "@/pages/list";
import { getJsonCustomer } from "@/utils";
const customer = getJsonCustomer();
console.log(customer);

export default function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Detail />
          {import.meta.env.DEV && <List />}
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
