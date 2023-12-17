import './App.css';
import { createClient } from '@supabase/supabase-js'
import { useState } from'react';

const supabaseUrl = 'https://wvpnvgvxtecukdoxmbad.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cG52Z3Z4dGVjdWtkb3htYmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NDQ0NjcsImV4cCI6MjAxODQyMDQ2N30.JQuhGVAqT1OeSHJAbmECj5Q8iwTqJ4ebYEoeFdsNQb8"
const supabase = createClient(supabaseUrl, supabaseKey)
let user = await supabase.auth.getUser().then(
    r => console.log("user", r))
function App() {
  return (
      <section>
        {user.user ? <SignIn/> : <SignIn/> }
      </section>
  );

}

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const changeEmail = (e) => setEmail(e.target.value)
  const changePassword = (e) => setPassword(e.target.value)
  return(
      <div>
        <form>
          <label>Email</label>
          <input value={email} onChange={changeEmail} type="email" name="email"/>
          <label>Password</label>
          <input value={password} onChange={changePassword} type="password" name="password"/>
          <button onClick={(email, password) =>
          supabase.auth.signInWithPassword({
            email: email,
            password: password,
          }).then(r => console.log("signed in", r))

          }>Sign In</button>
        </form>
      </div>
  )
}



function Chatroom() {
  return (
    <div>
      <h1>Chatroom</h1>
    </div>
  );
}

export default App;