import { useNavigate } from 'react-router-dom';
import userStore from '../stores/userStore';

const SignInForm = () => {
    const store = userStore();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      await store.signIn();
      navigate("/dashboard");
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow gap-5 self-center py-5 text-gray-800 mx-auto flex-1">
        <h2 className="font-serif text-3xl font-bold self-center">Sign In</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="font-serif text-sm font-bold">
            Email
            <input className="border rounded w-full py-1 px-2 font-normal" type="email" value={store.signInForm.email} onChange={store.updateSignInForm} name="email"></input>
          </label>
          <label className="font-serif text-sm font-bold">
            Password
            <input className="border rounded w-full py-1 px-2 font-normal" type="password" value={store.signInForm.password} onChange={store.updateSignInForm} name="password"></input>
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-5 self-center">
          <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" type="submit">Submit</button>
        </div>
      </form>
    );
  }
  
  export default SignInForm;