import React from 'react';

class List extends React.Component {
    handleClickUpdate = () => {
        this.props.update(this.props.index);
    };

    handleClickDelete = () => {
        this.props.delete(this.props.index);
    };

    render() {
        return (
            <div className="card card-playlist-list m-3" >
                <img src={this.props.details.avatar} className="card-img-top image-playlist" alt={this.props.details.name} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.details.name}</h5>
                    <div role="separator" className="dropdown-divider"></div>
                    <div className="text-right">
                        <button type="button" className="mr-1 btn btn-outline-secondary" onClick={this.handleClickUpdate} >Edit</button>
                        <button type="button" className="btn btn-outline-danger" onClick={this.handleClickDelete} >Delete</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default List;