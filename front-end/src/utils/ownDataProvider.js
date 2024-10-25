export const ownDataProvider = (data) => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { q, status, tasks, read, position } = params.filter;
    const { field, order } = params.sort;

    let filteredData = [...data];

    // Searching
    if (q) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Status
    if (status) {
      if (status && status !== "") {
        filteredData = filteredData.filter((item) => item.status === status);
      }
    }

    // Position
    if (position) {
      if (position && position !== "") {
        filteredData = filteredData.filter((item) => item.position === position)
      }
    }

    // Tasks
    if (tasks) {
      if (tasks === "hasTasks") {
        filteredData = filteredData.filter(
          (item) => item.tasks && item.tasks.length > 0
        );
      } else if (tasks === "noTasks") {
        filteredData = filteredData.filter(
          (item) => !item.tasks || item.tasks.length === 0
        );
      }
    }
    // Filter by "read" status
    if (read) {
      if (read === "true") {
        filteredData = filteredData.filter((item) => item.read === true);
      } else if (read === "false") {
        filteredData = filteredData.filter((item) => item.read === false);
      }
    }
    if (field === "id") {
      filteredData.sort((a, b) => {
        if (order === "ASC") return a.id - b.id;
        if (order === "DESC") return b.id - a.id;
        return 0;
      });
    } else if (field === "name") {
      filteredData.sort((a, b) => {
        if (order === "ASC") return a.name.localeCompare(b.name);
        if (order === "DESC") return b.name.localeCompare(a.name);
        return 0;
      });
    } else if (field === "position") {
      filteredData.sort((a, b) => {
        if (order === "ASC") return a.position.localeCompare(b.position);
        if (order === "DESC") return b.position.localeCompare(a.position);
        return 0;
      });
    }

    // Pagination
    const start = (page - 1) * perPage;
    const paginatedData = filteredData.slice(start, start + perPage);

    return Promise.resolve({
      data: paginatedData,
      total: filteredData.length,
    });
  },
});
