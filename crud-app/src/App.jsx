import { useState } from "react";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";

function App() {
  const [keyword, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <SearchForm onChangeValue={setKeyword} />
      <AddUser onAdd={setNewUser} />
      <ResultTable keyword={keyword} user={newUser} onAdded={() => setNewUser(null)} />
    </div>
  );
}

export default App;