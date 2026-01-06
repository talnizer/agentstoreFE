import React, { useEffect, useState } from 'react';
import AIToolsService from '../../Services/AIToolsService';
import useService from '../../hooks/useService';
import { toast } from 'react-toastify';
import AuthUser from '../Common/AuthUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Utils from '../../utils/Utils';
import PostFilters from './PostFilters';

export default function ListPosts(props) {
    const [drafts, setDrafts] = useState([]);
    const [copied, setCopied] = useState(false);
    const [copiedDraftIndex, setCopiedDraftIndex] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { user, getToken } = AuthUser();

    const aiToolsService = useService(AIToolsService);
    useEffect(() => {
        // setDrafts(props);
        setDrafts(values => [...props.drafts, ...values]);
    }, [props.drafts]);

    function fetchDrafts() {
        setLoading(true);
        // aiToolsService.fetchDraftPosts({ count: 1 }).subscribe({
        aiToolsService.fetchDraftPosts().subscribe({
            next: response => {
                console.log(response);
                setDrafts(response?.drafts);
            },
            error: e => {
                toast.dismiss();
                toast.error(e.message);
            },
            complete: () => { setLoading(false); },
        });

    }

    const deleteDraft = (draftId) => {
        setDeleting(deleting);
        aiToolsService.deleteDraftPost(draftId).subscribe({
            next: response => {
                console.log(response);
                fetchDrafts();
                // setDrafts(values => [response.draft, ...values]);
            },
            error: e => {
                toast.dismiss();
                toast.error(e.message);
            },
            complete: () => { setLoading(false); },
        });

    }
    const copy = (draftIndex, content) => {
        if (Utils.copyToClipBoard(content)) {
            setCopied(true);
            setCopiedDraftIndex(draftIndex);
            // setCopiedPostIndex(postIndex);

        }
        // Set a timeout to revert the state after 5 seconds
        const timer = setTimeout(() => {
            // setCopied('Initial ');
            setCopied(false);
            setCopiedDraftIndex();
            // setCopiedPostIndex();
        }, 5000); // 5000 milliseconds = 5 seconds
        // Cleanup function to clear the timeout if the component unmounts
        // before the timeout fires.
        return () => clearTimeout(timer);
        // setCopied(false);
    }
    function post(draftId, provider) {
        setLoading(true);
        aiToolsService.postOnSocialNetwork(draftId, provider, {}).subscribe({
            next: response => {
                console.log(response);
                alert('Posted: ' + JSON.stringify(response.data));
                fetchDrafts();
            },
            error: e => {
                toast.dismiss();
                toast.error(e.message);
            },
            complete: () => { setLoading(false); },
        });
    }
    return (
        <div>
            {drafts && drafts.length > 0 && <h3 className='text-center'>Posts</h3>
            }
            <div className='pt-3 row justify-content-center'>
                <div className='col-11'>

                    {user &&
                        <div className='text-left btn btn-outline-dark' onClick={() => fetchDrafts()}>
                            {!loading && "Refresh"}
                            {loading && (
                                <div className="spinner-border spinner-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            )}
                        </div>
                    }

                    {/* {user && (!drafts || drafts.length <= 0) && <span>No Post Yet</span>} */}
                    {drafts && drafts.length > 0 &&
                        <div className='card shadow m-3 p-2 bg-light'>
                            {drafts.map((draft, draftIndex) => (
                                ////other heads
                                <div className='bg-white rounded p-3 m-3' key={draftIndex}>

                                    {/* <ul >{draft.content && draft.content.map((post, postIndex) => ( */}
                                    {/* <ul> */}
                                    {/* {postIndex !== 0 && <hr />} */}
                                    <li className='list-inline-item'>
                                        <div className='row'>
                                            <div className='col-1 border-right'>
                                                <div className='align-self-center h5'>
                                                    {draftIndex + 1}
                                                </div>

                                            </div>
                                            <div className='col'>
                                                <div className='d-flex justify-content-between'>
                                                    <small>Platform <span className='text-left mb-3 text-primary text-capitalize'>{draft.query?.platform}</span></small>
                                                    <div className='text-right mb-3'>{new Date(draft.created_at).toLocaleString()}</div>
                                                </div>
                                                <pre style={{ whiteSpace: 'pre-wrap' }}>{draft.content}</pre>
                                                {/* <div className='mx-3 text-right btn btn-outline-dark' onClick={() => post(draft.id, 'facebook')}>Post to Facebook</div>
                                                <div className='mx-3 text-right btn btn-outline-dark' onClick={() => post(draft.id, 'linkedin')}>Post to LinkedIn</div> */}
                                                {user &&
                                                    <div className='mx-3 text-right btn btn-outline-dark' onClick={() => deleteDraft(draft._id)}>Delete</div>
                                                }
                                                <div id={draftIndex} className='mx-3 text-right btn btn-outline-dark' onClick={(e) => copy(draftIndex, draft.content)}>Copy
                                                    {draftIndex === copiedDraftIndex
                                                        &&
                                                        <FontAwesomeIcon size="xl" className={"px-1 text-success"} icon={faCheck} />
                                                    }
                                                    {/* {!(draftIndex === copiedDraftIndex && postIndex === copiedPostIndex)
                                        &&
                                        <FontAwesomeIcon size="xl" className={"px-1 text-dark"} icon={faCopy} />
                                    } */}
                                                </div></div>
                                        </div>
                                    </li>
                                    {/* </ul> */}
                                    {/* ))} */}
                                    {/* </ul> */}

                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
