import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
import api, { setToken } from '../../utils/api';
import AuthUser from '../Common/AuthUser';

export default function SocialConnect() {
    const [provider, setProvider] = useState('facebook');
    // const { token, setToken } = AuthUser();

    const [token, setToken] = useState('');
    const [pageId, setPageId] = useState('');
    async function save() {
        try {
            const res = await api.post('/social/connect', { provider, access_token: token, page_id: pageId });
            alert('Saved');
        } catch (err) { alert(err.response?.data?.detail || err.message); }
    }
    return (
        <div>
            <h2>Connect Social Account</h2>
            <div>
                <select value={provider} onChange={e => setProvider(e.target.value)}>
                    <option value="facebook">Facebook Page</option>
                    <option value="linkedin">LinkedIn</option>
                </select>
            </div>
            <div>
                <input placeholder="Access Token" value={token} onChange={e => setToken(e.target.value)} style={{ width: '80%' }} />
            </div>
            <div>
                <input placeholder="Page ID (for Facebook)" value={pageId} onChange={e => setPageId(e.target.value)} />
            </div>
            <div><button onClick={save}>Save</button></div>
            <p>Note: For production you should implement OAuth redirect flows to get tokens. This is a shortcut for testing only.</p>
        </div>
    );
}
