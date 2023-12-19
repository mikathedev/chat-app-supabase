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
        {user ? <Chatroom/> : <SignIn/> }
      </section>
  );

}

async function SignIn(credentials) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)


    return (
        <section className={"signin"}>
            <form>
                <label>Email</label>
                <input value={email} onChange={changeEmail} type="email" name="email"/>
                <label>Password</label>
                <input value={password} onChange={changePassword} type="password" name="password"/>
                <button type={"button"} onClick={signInWithEmail(email, password)}>Sign In
                </button>
                <button type={"button"} onClick={() => {signUpNewUser(email, password)}}>Sign up with supabase</button>
            </form>
        </section>
    )
}

async function signInWithEmail(email, pass) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
    })
    console.log(data, error)
}


async function signUpNewUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'localhost:3000'
        }
    })
    console.log(data, error)
}



function Chatroom() {
    return (
        <div>
            <h1>Chatroom</h1>
        </div>
    );
}

export default App;
