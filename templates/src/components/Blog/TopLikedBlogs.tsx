
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Heart } from 'lucide-react';
// import { Card, CardContent } from '../ui/card';

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
//   excerpt: string;
//   likesCount: number;
// }

// interface TopLikedBlogsProps {
//   blogs: Blog[];
// }

// const TopLikedBlogs = ({ blogs }: TopLikedBlogsProps) => {
//   return (
//     <div className="space-y-4">
//       {blogs.map((blog) => (
//         <Card key={blog.id} className="overflow-hidden hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <Link to={`/blog/${blog.slug}`} className="block">
//               <h3 className="font-medium text-base mb-1 hover:text-blue-600 transition-colors">
//                 {blog.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-2 line-clamp-2">
//                 {blog.excerpt}
//               </p>
//               <div className="flex items-center text-sm text-gray-500">
//                 <Heart size={14} className="text-red-500 mr-1" fill="#ef4444" />
//                 <span>{blog.likesCount} likes</span>
//               </div>
//             </Link>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default TopLikedBlogs;
import React from 'react';

const TopLikedBlogs = ({ blogs }) => {
  const medals = ["🏆", "🥈", "🥉"]; // Top 3 uchun belgi

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🏅 Top-Liked Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li
            key={blog.id}
            className="flex items-center border-b py-3 last:border-b-0"
          >
            {/* 1, 2, 3-o‘rinlar uchun maxsus belgi qo‘shish */}
            {index < 3 && (
              <span className="text-2xl mr-3">{medals[index]}</span>
            )}
            <div>
              <a
                href={`/blog/${blog.slug}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {blog.title}
              </a>
              <p className="text-gray-500 text-sm">{blog.excerpt}</p>
              <span className="text-xs text-gray-400">
                {blog.likesCount} likes
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopLikedBlogs;
