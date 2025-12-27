import React, { useEffect, useState } from 'react';
import AIToolsService from '../../Services/AIToolsService';
import useService from '../../hooks/useService';
import { toast } from 'react-toastify';
import AuthUser from '../Common/AuthUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Utils from '../../utils/Utils';

export default function Home() {
    const [drafts, setDrafts] = useState([]);
    const [copied, setCopied] = useState(false);
    const [copiedDraftIndex, setCopiedDraftIndex] = useState("");
    const [copiedPostIndex, setCopiedPostIndex] = useState("");
    const [inputs, setInputs] = useState({
    });
    const [generatingPosts, setGeneratingPosts] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [count, setCount] = useState(1);
    const topics = { BOLLYWOOD: 'Bollywood', TRAVEL: 'Travel', POLITICS: 'Politics', FNB: 'Food & Beverages' }
    const platforms = { LINKEDIN: 'LinkedIn', FACEBOOK: 'FaceBook' }
    const [topic, setTopic] = useState(topics.BOLLYWOOD);
    const { user, getToken } = AuthUser();

    const aiToolsService = useService(AIToolsService);
    useEffect(() => {
        setInputs(values => ({ ...values, 'topic': topics.BOLLYWOOD }));
        setInputs(values => ({ ...values, 'count': count }));
        // setInputs(values => ({ ...values, 'count': 1 }));
        // if (token) setToken(token);
        // fetchDrafts();
    }, []);
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
    function gen() {
        setGeneratingPosts(true);
        aiToolsService.generatePost(inputs).subscribe({
            next: response => {
                console.log(response);
                // fetchDrafts();
                if (response.status !== 0) {
                    setDrafts(values => [...response.drafts, ...values]);
                }
                else {
                    toast.dismiss();
                    toast.error(response.message);
                }
            },
            error: e => {
            },
            complete: () => { setGeneratingPosts(false); },
        });

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
    const handleChange = event => {
        const name = event.target.name;
        var value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const setTopicForInput = (topic) => {
        setInputs(values => ({ ...values, 'topic': topic }));
        setTopic(topic);
    }

    const setPlatform = (platform) => {
        setInputs(values => ({ ...values, 'platform': platform }));
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
            complete: () => { setGeneratingPosts(false); },
        });

    }

    return (
        <div>
            {/* <h2>Dashboard</h2> */}
            <div className='bg-light text-center mb-5 sticky-top'>
                <div className='pt-3 row justify-content-center'>
                    <div className='col-11'>
                        <h4>Topics</h4>
                        <div className='row'>
                            <div className='col mb-2 text-left'>
                                <span>Topic/Niche</span>
                                <button disabled={topic === topics.BOLLYWOOD} name="topic" value={topics.BOLLYWOOD} className={'mx-2 btn ' + (topic === topics.BOLLYWOOD ? 'btn-success' : 'btn-outline-success')} onClick={() => setTopicForInput(topics.BOLLYWOOD)}>{topics.BOLLYWOOD}</button>
                                <button disabled={topic === topics.TRAVEL} className={'mx-2 btn ' + (topic === topics.TRAVEL ? 'btn-success' : 'btn-outline-success')} onClick={() => setTopicForInput(topics.TRAVEL)}>{topics.TRAVEL}</button>
                                <button disabled={topic === topics.POLITICS} className={'mx-2 btn ' + (topic === topics.POLITICS ? 'btn-success' : 'btn-outline-success')} onClick={() => setTopicForInput(topics.POLITICS)}>{topics.POLITICS}</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mb-2 text-left'>
                                <span>Platforms</span>
                                <button disabled={inputs.platform === platforms.FACEBOOK} name="platform" value={platforms.FACEBOOK} className={'mx-2 btn ' + (inputs.platform === platforms.FACEBOOK ? 'btn-success' : 'btn-outline-success')} onClick={() => setPlatform(platforms.FACEBOOK)}>{platforms.FACEBOOK}</button>
                                <button disabled={inputs.platform === platforms.LINKEDIN} className={'mx-2 btn ' + (inputs.platform === platforms.LINKEDIN ? 'btn-success' : 'btn-outline-success')} onClick={() => setPlatform(platforms.LINKEDIN)}>{platforms.LINKEDIN}</button>
                            </div>
                        </div>
                        <textarea
                            type="textarea"
                            row="5"
                            className="form-control form-control-lg"
                            name="instructions"
                            placeholder="Write some addtional instructions (optional)"
                            value={inputs.instructions || ""}
                            onChange={handleChange}
                            maxLength={200}
                            required
                        />
                        <div className="m-3 btn btn-outline-dark 1bg-white" onClick={gen}>Generate Post
                            {generatingPosts && (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
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
                                                    <small className='text-left mb-3 text-primary'>{draft.platform}</small>
                                                    <div className='text-right mb-3'>{new Date(draft.created_at).toLocaleString()}</div>
                                                </div>
                                                <pre style={{ whiteSpace: 'pre-wrap' }}>{draft.content?.post}</pre>
                                                {/* <div className='mx-3 text-right btn btn-outline-dark' onClick={() => post(draft.id, 'facebook')}>Post to Facebook</div>
                                                <div className='mx-3 text-right btn btn-outline-dark' onClick={() => post(draft.id, 'linkedin')}>Post to LinkedIn</div> */}
                                                {user &&
                                                    <div className='mx-3 text-right btn btn-outline-dark' onClick={() => deleteDraft(draft._id)}>Delete</div>
                                                }
                                                <div id={draftIndex} className='mx-3 text-right btn btn-outline-dark' onClick={(e) => copy(draftIndex, draft.content?.post)}>Copy
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
