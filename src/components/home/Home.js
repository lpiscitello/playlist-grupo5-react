import React from 'react';
import Navbar from '../shared/Navbar';
import List from '../playlist/List';
import fetchURL from 'node-fetch';
import config from '../../config';

class Home extends React.Component {
    state = {
        user: {},
        songs: {}
    };

    componentWillMount() {
        this.getUser();
        this.getSongs();
    }

    getUser = () => {
        let user = {...this.state.user};
        const user1= this.props.location.state;
        user = user1;
        this.setState({user});
    };

    getSongs = () => {
        const endpointSongs = `${config.connection.hostname}:${config.connection.port}/songs`;

        fetchURL(endpointSongs, {
            mode: 'cors',
            headers: {
            'Access-Control-Allow-Origin':'*'
            }
        }).then(res => res.json()).then(jsonRes => {
            let songs = {...this.state.songs};
            const songs1 = jsonRes;
            songs = songs1;
            this.setState({songs});
        });
    }

    createPlaylist = () => {
        const key = `pl${Date.now()}`;
        const playlist = {
            id : key,
            name : 'New Playlist',
            user : this.state.user.userName,
            avatar : "https://static.qobuz.com/images/covers/23/86/5056163018623_600.jpg",
            song: [] 
        };

        const endpoint = `${config.connection.hostname}:${config.connection.port}/playlists`;

        fetchURL(endpoint, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(playlist)
        }).then(res => res.json()).then(jsonRes => {
            const url = `/home/${this.state.user.id}/${jsonRes.id}}`;
            
            const user = {...this.state.user}; 
            if (!user.playlists){
                user.playlists = [];
            }
            user.playlists.push(jsonRes);
            this.setState({user});

            this.props.history.push(url, {
                playlist: jsonRes,
                user: this.state.user,
                songs: this.state.songs
            });
        });        
    }

    deletePlaylist = (key) => {
        const endpoint = `${config.connection.hostname}:${config.connection.port}/playlists/${this.state.user.playlists[key].id}`;

        fetchURL(endpoint, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
            'Access-Control-Allow-Origin':'*'
            }
        }).then(res => {
            const user = {...this.state.user}; 
            delete user.playlists[key];
            this.setState({user});
        });  
    };

    updatePlaylist = (key) => {
        const url = `/home/${this.state.user.id}/${this.state.user.playlists[key].id}`;
        this.props.history.push(url, {
            playlist: this.state.user.playlists[key],
            user: this.state.user,
            songs: this.state.songs
        });
    };

    render() {
        let playlistsId = [];
        if (this.state.user.playlists) {
            playlistsId = Object.keys(this.state.user.playlists);
        }
        return (
            <form>
                <Navbar userName={this.state.user.userName}/>
                <div className="row m-t-50 m-b-50">
                    <div className="col-2"></div>
                    <div className="col-8"><h3>My Playlists</h3></div>
                    <div className="col-2"></div>

                    <div className="col-2"></div>
                    <div className="col-8 playlist-list-div">
                        <div className="row">
                        {playlistsId.map(
                            key => (
                                <List 
                                    key={key}
                                    index={key} 
                                    details={this.state.user.playlists[key]} 
                                    delete={this.deletePlaylist}
                                    update={this.updatePlaylist}
                                />
                        ))}
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="btn btn-outline-light playlist-create" onClick={this.createPlaylist}>Create Playlist</div>
            </form>
        );
    };
}

export default Home;