import './App.css';
import { createClient } from '@supabase/supabase-js'
import { useState } from'react';

const supabaseUrl = 'https://wvpnvgvxtecukdoxmbad.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cG52Z3Z4dGVjdWtkb3htYmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NDQ0NjcsImV4cCI6MjAxODQyMDQ2N30.JQuhGVAqT1OeSHJAbmECj5Q8iwTqJ4ebYEoeFdsNQb8"
const supabase = createClient(supabaseUrl, supabaseKey)
const user = await supabase.auth.getUser()
const { data } = await supabase
    .from('messages')
    .select()
function App() {
  return (
      <section>
        {user.data.user ? <Chatroom/> : <SignIn/> }
      </section>
  );

}

function SignIn() {
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
                <button type={"button"} onClick={() => signInWithEmail(email, password)}>Sign In</button>
                <button type={"button"} onClick={() => signUpNewUser(email, password)}>Sign up with supabase</button>
            </form>
        </section>
    )
}

async function signInWithEmail(email, pass) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
    })
    console.log("data", data, "error", error)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
}

async function signUpNewUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'mikachat.netify.com'
        }
    });
    // eslint-disable-next-line no-restricted-globals
    location.reload()

    console.log("data", data, "error", error)
}



function Chatroom() {
    const [chatVal, setChatVal] = useState("")
    const sendMessage = async (e) => {
        if (chatVal !== ""){
            e.preventDefault()
            const {data, error} = await supabase.from("messages").insert([{
                name: user.data.user,
                content: chatVal
            }])
            console.log("data", data, "error", error)
            setChatVal("")
        }
    }
    console.log(user.data.user)
    /*const getMessages = async () => {
        supabase.from("messages").select("content").then((res) => {console.log(res)})
    }*/
    return (
        <div>
            <h1>Chatroom</h1>
            <ul>
                {data.map((row) => (
                    <li key={row.id}>{row.column1}, {row.column2}</li>
                ))}
            </ul>
            <input onChange={(e) => setChatVal(e.target.value)} value={chatVal}/>
            <button onClick={sendMessage}>send</button>
            <button onClick={() => signOutUser()}>sign out</button>
        </div>
    );

}

async function signOutUser() {
    const { error } = await supabase.auth.signOut()
    console.log("error", error)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
}

export default App;