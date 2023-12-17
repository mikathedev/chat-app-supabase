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
        {user ? <SignIn/> : <SignIn/> }
      </section>
  );

}

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

  return(
      <section className={"signin"}>
          <form>
              <label>Email</label>
              <input value={email} onChange={changeEmail} type="email" name="email"/>
              <label>Password</label>
              <input value={password} onChange={changePassword} type="password" name="password"/>
              <button type={"button"} onClick={signin(email, password)}>Sign In
              </button>
              <button type={"button"} onClick={signup(email, password)}>Sign up</button>
          </form>
      </section>
  )
}


function Chatroom() {
    return (
        <div>
            <h1>Chatroom</h1>
        </div>
    );
}

function signin(email, pass) {
    supabase.auth.signInWithPassword({
        email: email,
        password: pass,
    }).then(r => {
        return console.log("signed up", r)
    })
}
function signup(email, pass) {
    supabase.auth.signUp({
        email: email,
        password: pass,
    }).then(r => {
        return console.log("signed up", r)
    })
}

export default App;