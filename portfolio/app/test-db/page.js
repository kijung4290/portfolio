'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDB() {
    const [status, setStatus] = useState('Checking...');
    const [error, setError] = useState(null);
    const [envCheck, setEnvCheck] = useState({});

    useEffect(() => {
        async function checkConnection() {
            // 1. Check Env Vars (Client-side)
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            setEnvCheck({
                urlDefined: !!url,
                keyDefined: !!key,
                urlValue: url ? url.substring(0, 15) + '...' : 'undefined', // Show partial for safety
            });

            if (!url || !key) {
                setStatus('Failed');
                setError('Environment variables are missing. Please check .env.local');
                return;
            }

            try {
                // 2. Try to fetch from Supabase
                const { data, error } = await supabase
                    .from('portfolio')
                    .select('*')
                    .limit(1);

                if (error) {
                    setStatus('Error connecting to Supabase');
                    setError(JSON.stringify(error, null, 2));
                } else {
                    setStatus('Success! Connected to Supabase.');
                    setError(null);
                }
            } catch (err) {
                setStatus('Exception occurred');
                setError(err.message);
            }
        }

        checkConnection();
    }, []);

    return (
        <div style={{ padding: '50px', fontFamily: 'monospace' }}>
            <h1>Supabase Connection Test</h1>

            <div style={{ marginBottom: '20px', padding: '20px', background: '#f5f5f5' }}>
                <h2>1. Environment Variables Check</h2>
                <p>NEXT_PUBLIC_SUPABASE_URL: {envCheck.urlDefined ? '✅ Defined' : '❌ MISSING'} ({envCheck.urlValue})</p>
                <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envCheck.keyDefined ? '✅ Defined' : '❌ MISSING'}</p>
                {!envCheck.urlDefined && <p style={{ color: 'red' }}>⚠️ Make sure you created .env.local file and restarted the server!</p>}
            </div>

            <div style={{ padding: '20px', background: status.includes('Success') ? '#dcfce7' : '#fee2e2' }}>
                <h2>2. Connection Status</h2>
                <h3>{status}</h3>
                {error && (
                    <pre style={{ background: 'black', color: 'white', padding: '10px', overflow: 'auto' }}>
                        {error}
                    </pre>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <p>If you see "relation does not exist", run the SQL script in Supabase SQL Editor.</p>
                <p>If you see "Invalid API Key", check your keys in .env.local.</p>
            </div>
        </div>
    );
}
