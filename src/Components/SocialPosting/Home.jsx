import React, { useEffect, useState } from 'react';
import AIToolsService from '../../Services/AIToolsService';
import useService from '../../hooks/useService';
import { toast } from 'react-toastify';
import AuthUser from '../Common/AuthUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Utils from '../../utils/Utils';
import PostFilters from './PostFilters';
import ListPosts from './ListPosts';

export default function Home() {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
    }, []);

    function handleGeneratedDrafts(drafts) {
        setDrafts(drafts);
    }
    return (
        <div>
            <PostFilters generatedDraft={handleGeneratedDrafts} />
            <ListPosts drafts={drafts} />
        </div>
    );
}
