
import ReactDOM from 'react-dom';
import _ from 'lodash';
import React from 'react';
import Searchbar from './search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './video_list';
import VideoDetail from './video_detail';
import VideoListItem from './video_list_item';

const API_KEY = "AIzaSyBzoPbzfLcX2Ji6da2EIQgKAujcxlQDCrI";




class Youtube extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
        selectedVideo:null
     };
    this.videoSearch('surfboards');

    }
    videoSearch(term){

        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({ videos:videos,
            selectedVideo:videos[0] });
        });

    }
    render() {
        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div className="Youtube">
                <div className="img"><img src="../src/logo.png" width="100" height="100"/></div>
                <b>Search:</b><Searchbar onSearchTermChange={videoSearch}/><br /><br />
                 <VideoDetail video={this.state.selectedVideo}/> 
                 <VideoList 
                 onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                 videos={this.state.videos} />
            </div>
        )
    }
}

module.exports = Youtube;