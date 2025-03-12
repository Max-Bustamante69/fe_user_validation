
import "../styles/tailwind.css";
import DiditForm from "../components/DiditForm";
import Button from "../components/Button";

function App() {


  return (
    
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 text-gray-100">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 transition-all duration-300">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-400 mb-2 tracking-tight">
            KYC Verification
          </h1>
          <p className="text-gray-400">
            Enter your information to start the verification process
          </p>
        </div>
        <DiditForm />



        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Secure KYC verification system</p>
        </div>
      </div>

      <Button> Click Me!</Button>

    </div>
  );
}

export default App;
