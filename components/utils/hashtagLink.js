import Link from 'next/link';

export const formatContent = (content) => {
    const regEx = /(#\w+)/g;
    const parts = content.split(regEx);

    return parts.map((tagPart, index) => {
        if (tagPart.startsWith('#')) {
            return (
                <Link
                    key={index}
                    href={`/Hashtag/${tagPart.substring(1)}`}
                    style={{ color: '#1DA1F2', fontWeight: 'bold', textDecoration: 'none' }}
                >
                    {tagPart}
                </Link>
            );
        };
        return tagPart;
    });
};