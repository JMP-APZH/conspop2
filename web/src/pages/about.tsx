import PublicLayout from '../components/Layout/PublicLayout';

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">About SurveyApp</h1>
        <div className="space-y-4">
          <p>SurveyApp is a platform for creating and participating in surveys.</p>
          <p>Our mission is to help organizations make data-driven decisions by collecting community feedback.</p>
          <p>This project was created as part of a sociological research initiative.</p>
        </div>
      </div>
    </PublicLayout>
  );
}