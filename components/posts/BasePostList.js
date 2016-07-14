import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip';
import StarIcon from 'material-ui/svg-icons/action/grade';

import { PostBasePropType } from '../../schemas/PostBaseSchema'

export default class BasePostList extends Component {
    static propTypes = {
        posts: PropTypes.arrayOf(PostBasePropType).isRequired,
        postTypeName: PropTypes.string.isRequired,
        onTouchTapItem: PropTypes.func.isRequired
    };
    
    render() {
        let postList;
        if (this.props.posts.length === 0) {
            postList = <ListItem key="empty"
                                    primaryText={`No ${ this.props.postTypeName }s`}
                                    disabled={true}/>
        } else {
            postList = this.props.posts.map(post => {
                let description = <div style={{display: 'flex'}}>
                    <div style={{marginRight: 'auto'}}>{post.Name}</div>
                    {post.Tags.map(({Name}) => <Chip key={Name} style={{margin: '0 2px'}}>{Name}</Chip>)}
                </div>;
                
                let itemProps = {};
                if (post.Recommended) {
                    itemProps.rightIcon = <StarIcon color="gray" />;
                }
                if (post.MatchingScore) {
                    console.log("Matching score", post);
                    itemProps.leftIcon = <div>{post.MatchingScore.toFixed(1)}</div>;
                }
                
                return <ListItem key={post.ID}
                                 primaryText={description}
                                 secondaryText={post.Description}
                                 onTouchTap={this.props.onTouchTapItem.bind(this, post)}
                                 {...itemProps} />
            });
        }
        
        return (
            <List>
                {postList}
            </List>
        )
    }
}