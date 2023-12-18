import './App.css';
import { createClient } from '@supabase/supabase-js';

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

function SignIn() {

  return(
      <section className={"signin"}>
          <form>
              <button type={"button"} onClick={supabase.auth.signInWithOAuth({provider:"google"})}>Sign in with supabase</button>
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

export default App;