import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import linkStore from '../stores/linkStore.js';
import debounce from './debounce.js';

function LinkForm() {
  const store = linkStore();
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    store.fetchLinks();
    setInitialized(true);
  }
  
  useEffect(() => {
    let timeoutId;
  
    const debouncedFetchLinks = debounce(() => {
      store.fetchLinks();
    }, 10000);
  
    debouncedFetchLinks();
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [store]);

  return (
    <div className="flex flex-col flex-grow gap-5 self-center py-5 text-gray-800 mx-auto flex-1">
      <h2 className="font-serif text-3xl font-bold self-center">Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {store.links && store.links.map((data) => {
          return (
            <div key={data._id} className="border rounded p-5">
              <h3 className="font-serif text-xl font-bold">Long Url</h3>
              <Link to={data.link} className="font-normal">{data.link}</Link>
              <h3 className="font-serif text-xl font-bold">Short Url</h3>
              <Link to={"/s/"+data.key} className="font-normal">{"http://localhost:5000/s/"+data.key}</Link>
              <div className="flex gap-5 mt-3">
                <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" onClick={() => store.deleteLink(data._id)}>Delete</button>
                <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" onClick={() => store.toggleUpdate(data)}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      {store.update === true && (
        <div className="border rounded p-5 ">
          <form onSubmit={store.updateLink} className="flex flex-col gap-5">
            <input className="border rounded w-full py-1 px-2 font-normal" onChange={store.handleUpdateFieldChange} name="link" value={store.updateForm.link} />
            <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" type="submit">Update Link</button>
          </form>
        </div>
      )}
      {store.update === false && (
        <div className="border rounded p-5 self-center">
          <form onSubmit={store.createLink} className="flex flex-col gap-5">
            <input className="border rounded w-full py-1 px-2 font-normal" onChange={store.updateCreateFormField} name="link" value={store.createForm.link} />
            <button className="font-serif bg-gray-800 text-white p-2 font-bold hover:text-gray-300 text-xl rounded" type="submit">Create Link</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LinkForm;