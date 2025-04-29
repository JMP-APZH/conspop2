import PublicLayout from '../components/PublicLayout';

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-6xl font-bold mb-6 text-center text-black">Sa ou pou sav</h1>
        <div className="space-y-4 text-center mt-40">
          <p className='bg-red-800'>SurveyApp is a platform for creating and participating in surveys.</p>
          <p className='bg-green-800'>Our mission is to help organizations make data-driven decisions by collecting community feedback.</p>
          <p className='bg-black'>This project was created as part of a sociological research initiative.</p>
        </div>
      </div>
    </PublicLayout>
  );
}