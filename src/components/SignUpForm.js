import { useNavigate } from 'react-router-dom';
import userStore from '../stores/userStore.js';

const SignInForm = () => {
    const store = userStore();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      await store.signUp();
      navigate("/sign-in");
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow gap-5 self-center py-5 text-gray-800 mx-auto flex-1">
        <h2 className="font-serif text-3xl font-bold self-center">Sign Up</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="font-serif text-sm font-bold">
            Email
            <input className="border rounded w-full py-1 px-2 font-normal" type="email" value={store.signUpForm.email} onChange={store.updateSignUpForm} name="email"></input>
          </label>
          <label className="font-serif text-sm font-bold">
            Password
            <input className="border rounded w-full py-1 px-2 font-normal" type="password" value={store.signUpForm.password} onChange={store.updateSignUpForm} name="password"></input>
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-5 self-center">
          <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" type="submit">Submit</button>
        </div>
      </form>
    );
  }
  
  export default SignInForm;