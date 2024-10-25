import { fetchUtils } from 'react-admin';
// import { BASE_URL } from '../constants';

// const apiUrl = `${BASE_URL}/joblists`;
// const apiUrl = 'https://www.freelancer.com/api/projects/0.1/jobs/search/?job_names[]=PHP&job_names[]=website%20design';
const accesToken = 'LsyzxtFCOPHlJZXifNwt637N89ZDgl';
const apiUrl = 'https://www.freelancer.com/api/projects/0.1/jobs/search/?job_names[]';
const httpClient = fetchUtils.fetchJson;

// Функция для безопасного доступа к вложенному полю объекта
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const jobsProvider = {
    getList: async (resource, params) => {
        // const token = sessionStorage.getItem('jwt');

        const headers = new Headers({
            'freelancer-oauth-v1': accesToken,
            'Content-Type': 'application/json',
        });

        const { json } = await httpClient(`${apiUrl}`, {
            headers,
        });

        const filters = params.filter;

        let filteredData = json.result;

        // Поиск по нескольким колонкам
        if (filters.q) {
            const query = filters.q.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.category.name?.toLowerCase().includes(query) ||
                item.name?.toLowerCase().includes(query) ||
                String(item.local).toLowerCase().includes(query) ||
                item.id.toString().includes(query)
            );
        }

        if (filters.id) {
            filteredData = filteredData.filter(item =>
                item.id.toString().includes(filters.id)
            );
        }

        // Выполняем сортировку на клиенте
        const { field, order } = params.sort;
        const sortedData = filteredData.sort((a, b) => {
            // Используем функцию для получения значений
            const aValue = getNestedValue(a, field) || '';  // Убедитесь, что поле существует
            const bValue = getNestedValue(b, field) || '';

            // Приведение к строке для корректного сравнения строк
            const aVal = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
            const bVal = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

            // Логика сортировки
            if (aVal > bVal) {
                return order === 'ASC' ? 1 : -1;
            }
            if (aVal < bVal) {
                return order === 'ASC' ? -1 : 1;
            }
            return 0;
        });

        const { page, perPage } = params.pagination;
        const paginatedData = sortedData.slice((page - 1) * perPage, page * perPage);

        return {
            data: paginatedData,
            total: sortedData.length
        };
    },

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${params.id}`);
        return { data: json };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(apiUrl, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return { data: json };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return { data: json };
    },

    delete: async (resource, params) => {
        await httpClient(`${apiUrl}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: { id: params.id } };
    },
};

export default jobsProvider;
