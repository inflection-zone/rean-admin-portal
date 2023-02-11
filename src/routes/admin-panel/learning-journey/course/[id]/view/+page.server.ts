import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getCourseById } from '../../../../../api/services/admin-panel/course';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const courseId = event.params.id;
    console.log(courseId);
    const response = await getCourseById(sessionId, courseId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const course = response.Data;
    console.log('course id', course);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      course,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving course: ${error.message}`);
  }
};
