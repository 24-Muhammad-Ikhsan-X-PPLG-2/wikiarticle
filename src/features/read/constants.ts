const ARTICLE_CONTENT = {
  title: "The History of Artificial Intelligence",
  subtitle: "From early concepts to the modern AI revolution",
  category: "Technology",
  author: {
    name: "Sarah Johnson",
    avatar: "👩‍💼",
  },
  publishedDate: "2024-03-15",
  readingTime: 8,
  content: `
## Introduction to AI

Artificial Intelligence (AI) has become one of the most transformative technologies of our time. But the concept is far from new. The journey of AI spans over seven decades, filled with groundbreaking discoveries, ambitious visions, and unexpected setbacks.

## The Birth of AI (1950s)

The story of AI begins in the 1950s when computer scientists first began to dream of creating machines that could think. **Alan Turing**, a brilliant mathematician and logician, proposed the famous "Turing Test" in 1950 as a measure of machine intelligence.

In 1956, the **Dartmouth Summer Research Project on Artificial Intelligence** marked the official birth of AI as an academic discipline. Researchers like John McCarthy, Marvin Minsky, and Nathaniel Rochester gathered to explore the possibility of creating thinking machines.

## The Golden Age (1960s-1970s)

The 1960s and 1970s saw tremendous optimism about AI's potential. Researchers developed early expert systems and natural language processing programs. However, this period also saw the emergence of the first "AI Winter" – a period of reduced funding and interest.

## Expert Systems Era (1980s)

The 1980s brought renewed interest in AI with the rise of expert systems – programs that attempted to capture human expertise in specific domains. These systems showed promise in medical diagnosis, mineral exploration, and other specialized fields.

## Modern AI Revolution (2000s-Present)

The 21st century has witnessed an unprecedented explosion in AI capabilities. Machine learning, deep learning, and neural networks have revolutionized the field. Today, AI powers everything from recommendation algorithms to autonomous vehicles.

The development of **GPT models**, **DALL-E**, and other generative AI systems has pushed the boundaries of what we thought possible. These systems can now generate human-like text, create images from descriptions, and perform complex reasoning tasks.

## The Future of AI

As we look to the future, AI continues to evolve at a rapid pace. The challenges ahead include ensuring AI systems are safe, ethical, and beneficial for humanity. The field remains one of the most exciting and important areas of research today.
  `,
  relatedArticles: [
    {
      title: "Machine Learning Fundamentals",
      category: "Programming",
      excerpt:
        "Core concepts and algorithms that power modern AI applications.",
      views: 58900,
      gradient: "from-lime-400 to-green-500",
    },
    {
      title: "Deep Learning Explained",
      category: "Technology",
      excerpt: "Understanding neural networks and deep learning architectures.",
      views: 45200,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      title: "The Future of AI Ethics",
      category: "Technology",
      excerpt:
        "Exploring the ethical implications and challenges of AI development.",
      views: 32100,
      gradient: "from-orange-400 to-rose-500",
    },
    {
      title: "Computer Vision: How AI Sees",
      category: "Technology",
      excerpt:
        "Understanding image recognition and computer vision technologies.",
      views: 51300,
      gradient: "from-blue-400 to-cyan-500",
    },
  ],
  comments: [
    {
      id: 1,
      author: "Alex Chen",
      avatar: "👨‍💻",
      timestamp: "2 days ago",
      text: "Excellent overview of AI history! Really appreciate how you traced the development from Turing to modern deep learning.",
    },
    {
      id: 2,
      author: "Maria Rodriguez",
      avatar: "👩‍🔬",
      timestamp: "1 day ago",
      text: "The section on expert systems was particularly insightful. Would love to see more on the AI winters and what caused them.",
    },
  ],
};

export default ARTICLE_CONTENT;
