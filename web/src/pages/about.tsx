import PublicLayout from '../components/PublicLayout';

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-6xl font-bold mb-6 text-center text-black">Sa ou pou sav'</h1>
        <div className="space-y-4 text-center">
          <p className='-ml-5 mr-5 bg-red-800 lg:text-4xl font-bold p-2'>SurveyApp is a platform for creating and participating in surveys.</p>
          <p className='bg-green-800 lg:text-4xl font-bold p-2'>Our mission is to help organizations make data-driven decisions by collecting community feedback.</p>
          <p className='ml-5 -mr-5 bg-black lg:text-4xl font-bold p-2'>This project was created as part of a sociological research initiative.</p>
        </div>
      </div>
    </PublicLayout>
  );
}