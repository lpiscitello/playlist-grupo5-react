import React from 'react';
import '../../assets/css/login.css';
import fetchURL from 'node-fetch';
import config from '../../config';

class Login extends React.Component {
    userRef = React.createRef();
    passwordRef = React.createRef();

    validateUser = (event) => {
        // 1. Detener la recarga de la página.-
        event.preventDefault();

        // // 2. Tomar los datos requeridos.-
        const user = this.userRef.current.value;
        const password = this.passwordRef.current.value;

        const endpoint = `${config.connection.hostname}:${config.connection.port}/users/${user}`;

        fetchURL(endpoint, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*',
            'password': password
          }
        }).then(res => res.json()).then(json => {
          // 3. Ir al componente.-
          const output = document.getElementById('output');
          if (!json.username) {
            output.innerHTML = 'Invalid username or password';
            output.classList.add('alert', 'alert-danger', 'animated', 'fadeInUp');
          } else {
            output.innerHTML = 'Logging in';
            output.classList.add('alert', 'alert-success');

            let userLogged = {
                id: json.id,
                userName: json.username
            };
            
            const endpoint = `${config.connection.hostname}:${config.connection.port}/user/playlists/${userLogged.userName}`;

            fetchURL(endpoint, {
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin':'*'
              }
            }).then(resPlaylist => resPlaylist.json()).then(jsonRes => {
                userLogged.playlists = jsonRes;
                this.props.history.push(`/home/${json.id}`, userLogged);
            });
          }
        });        
    };

    render() {
      return (
        <form className="login-form" onSubmit={this.validateUser} >
          <div className="container">
            <div className="login-container">
                <div className="form-box">
                  <div id="output"></div>
                  <div className="avatar">
                    <h4>Login into MELIFY</h4>
                  </div>
                  <input type="text" name="uname" required placeholder="User Name" ref={this.userRef} />
                  <input type="password" name="psw" required placeholder="Password" ref={this.passwordRef} />
                  <button className="btn btn-outline-primary btn-block login" type="submit" >Go to my space</button>
                  <br />
                </div>
            </div>
          </div>
        </form>
      );
    }
  }

export default Login;