import React from 'react';
import Navbar from '../shared/Navbar';
import Songs from './Songs';
import fetchURL from 'node-fetch';
import config from '../../config';

class Playlist extends React.Component {
    nameRef = React.createRef();

    state = {
        playlist: this.props.location.state.playlist
    }

    cancelPlaylist = () => {
        let playlist = this.state.playlist;
        playlist.name = this.nameRef.current.value;
        this.setState({playlist});
        
        this.props.history.push(`/home/${this.props.match.params.userId}`, this.props.location.state.user);
    };
    
    removeSong = () => {
        this.props.history.push(`/home/${this.props.match.params.userId}`, this.props.location.state.user);
    };

    addToPlaylist = (index, id) => {
        const playlist = {...this.state.playlist};
        if (!playlist.songs.find(song => song && song.id == id)) {
            const endpoint = `${config.connection.hostname}:${config.connection.port}/playlists/${playlist.id}`;

            fetchURL(endpoint, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                    'Access-Control-Allow-Origin':'*',
                    idSong: id
                }
            }).then(res => {
                playlist.songs.push(this.props.location.state.songs[index]);
                this.setState({playlist});
            }); 
        }
    }

    deleteFromPlaylist = (key, id) => {
        console.log(id);
        const playlist = {...this.state.playlist}; 
        const endpoint = `${config.connection.hostname}:${config.connection.port}/playlists/${playlist.id}`;
        fetchURL(endpoint, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                'Access-Control-Allow-Origin':'*',
                idSong: id
            }
        }).then(res => {
            delete playlist.songs[key];
            this.setState({playlist});
        }); 
    };

    render() {
        const user = this.props.location.state.user;
        const songsIds = Object.keys(this.state.playlist.songs);
        const listOfSongs = Object.keys(this.props.location.state.songs);
        return (
            <form>
                <Navbar userName={user.userName}/>
                <div className="row m-t-50 m-b-50">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3>Name: <input type="text" className="form-control-playlist" defaultValue={this.state.playlist.name} ref={this.nameRef} placeholder="New Playlist" /></h3>
                    </div>
                    <div className="col-2"></div>
                
                    <div className="col-2"></div>
                    <div className="col-8 playlist-list-div" >
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Genere</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    songsIds.map(
                                        key => (
                                            <Songs 
                                            song={this.state.playlist.songs[key]} 
                                            key={key}
                                            index={key}
                                            id={this.state.playlist.songs[key].id}
                                            deleteFromPlaylist = {this.deleteFromPlaylist} 
                                            displayDelete="true"
                                            />
                                        )
                                    )
                                }   
                            </tbody>
                        </table>
                    </div>
                    <div className="col-2"></div>

                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3>Add to the playlist</h3>
                    </div>
                    <div className="col-2"></div>

                    <div className="col-2"></div>
                    <div className="col-8 playlist-list-div">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Genere</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listOfSongs.map(
                                        key => (
                                            <Songs 
                                            song={this.props.location.state.songs[key]} 
                                            key={key}
                                            index={key}
                                            id={this.props.location.state.songs[key].id}
                                            addToPlaylist = {this.addToPlaylist}
                                            displayDelete = "false"
                                            />
                                        )
                                    )
                                }   
                            </tbody>
                        </table>
                    </div>
                    <div className="col-2"></div>   
                </div>
                {/* <div className="btn btn-outline-light playlist-create">Save Playlist</div> */}
                <div className="btn btn-outline-danger playlist-create" onClick={this.cancelPlaylist}>Go back</div>
            </form>
        );
    }
}

export default Playlist;