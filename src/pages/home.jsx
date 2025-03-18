import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Home() {
  const features = [
    {
      title: 'Modern UI Components',
      description: 'A collection of reusable UI components built with Tailwind CSS.',
      icon: '🧩'
    },
    {
      title: 'Dark Mode Support',
      description: 'Full support for light and dark mode themes.',
      icon: '🌓'
    },
    {
      title: 'API Integration',
      description: 'Built-in API hooks for seamless data fetching and state management.',
      icon: '🔄'
    },
    {
      title: 'Responsive Design',
      description: 'Fully responsive layouts that work on any device size.',
      icon: '📱'
    }
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary-600 dark:text-primary-400">Welcome to React Tailwind</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
          A modern React application with Tailwind CSS, React Router, and React Query.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/products">
            <Button variant="primary" size="lg">Browse Products</Button>
          </Link>
          <Link to="/stepper">
            <Button variant="secondary" size="lg">Try Stepper</Button>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-2 text-4xl">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gray-100 py-12 dark:bg-gray-700">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Explore the different sections of the application to see all features in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/checkout">
              <Button variant="primary" size="lg">Checkout Demo</Button>
            </Link>
            <Link to="/focus">
              <Button variant="outline" size="lg">Focus Example</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}