'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDBPage() {
    const [status, setStatus] = useState('Checking...');
    const [envInfo, setEnvInfo] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        setEnvInfo({
            url: url ? 'Present ' + (url.includes('supabase.co') ? '(Valid URL format)' : '(Invalid format)') : 'Missing',
            key: key ? 'Present (Length: ' + key.length + ')' : 'Missing'
        });

        if (!url || !key) {
            setStatus('Failed: Environment variables missing.');
            return;
        }

        try {
            const { data, error } = await supabase.from('portfolio').select('count', { count: 'exact', head: true });

            if (error) {
                setStatus('Failed: Supabase error.');
                setError(error.message + (error.hint ? ` (${error.hint})` : ''));
            } else {
                setStatus('Success! Connected to Supabase.');
            }
        } catch (err) {
            setStatus('Failed: Unexpected error.');
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '50px', fontFamily: 'monospace' }}>
            <h1>Supabase Connection Test</h1>
            <div style={{ margin: '20px 0', padding: '20px', background: '#f0f0f0', borderRadius: '5px' }}>
                <p><strong>Status:</strong> <span style={{ color: status.startsWith('Success') ? 'green' : 'red', fontWeight: 'bold' }}>{status}</span></p>
                {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
            </div>

            <h3>Environment Variables</h3>
            <ul>
                <li>NEXT_PUBLIC_SUPABASE_URL: {envInfo.url}</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envInfo.key}</li>
            </ul>

            <div style={{ marginTop: '20px' }}>
                <p>If variables are missing, ensure <code>.env.local</code> exists and you have restarted the server.</p>
            </div>
        </div>
    );
}
