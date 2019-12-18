import React from 'react';

class Songs extends React.Component {
    handleClickAddToPlaylist = () => {
        this.props.addToPlaylist(this.props.index, this.props.id)
    }

    handleClickDeleteFromPlaylist = () => {
        this.props.deleteFromPlaylist(this.props.index, this.props.id)
    }

    render() {
        return (
            <tr>
                <td>{this.props.song.name}</td>
                <td>{this.props.song.artist[0].name}</td>
                <td>{this.props.song.genere[0].name}</td>
                <td className={this.props.displayDelete === 'true' ? 'display' : 'display-none'}><i className="icon-playlist fa fa-times" onClick={this.handleClickDeleteFromPlaylist} title="Remove" /></td>
                <td className={this.props.displayDelete === 'true' ? 'display-none' : 'display'}><i className="icon-playlist fa fa-plus" onClick={this.handleClickAddToPlaylist} title="Add to playlist" /></td>
            </tr>
        );
    };
}

export default Songs;