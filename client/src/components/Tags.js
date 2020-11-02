import React, { useRef, useState, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete';

export const Tags = ({ tagsInBase, newTags, currentTags }) => {
    const [tags, setTags] = useState([]);
    const refContainer = useRef(null);
    
    useEffect(() => {
        if(currentTags){
            setTags(currentTags)
        }
        
      }, [currentTags])

    useEffect(() => {
        let position = null;
        tagsInBase.forEach((tagBase, i) => {
            tags.forEach(taglocal => {
                if (tagBase.name === taglocal.name) {
                    position = i;
                }
            });
        });
        
        if(position || position === 0){
            tagsInBase.splice(position, 1);
        }
    }, [tags])

    const onDelete = (i) => {
        if (tags[i].id) {
            tagsInBase.push(tags[i]);
        }
        const tagsDel = tags.slice(0);
        tagsDel.splice(i, 1);
        setTags([...tagsDel]);
        newTags([...tagsDel]);
    }

    const onAddition = (tag) => {
        let num = 0;

        tags.forEach(item => {
            if (item.name === tag.name) {
                num++;
            }
        })
        if (num > 0) {
            return;
        }
        console.log(tags)
        const tagsAdd = [].concat(tags, tag);
        setTags([...tagsAdd]);
        newTags([...tagsAdd]);
    }

    return (
        
        <ReactTags
            ref={refContainer}
            tags={tags}
            suggestions={tagsInBase}
            onDelete={onDelete}
            onAddition={onAddition}
            allowNew={true}
            allowBackspace={false}
        />
    )
}